require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const sequelize = require("./config/database");

const app = express();

/* ===============================
   CORS CONFIG
================================ */
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

/* ===============================
   BODY PARSER
================================ */
app.use(express.json({ limit: "2mb" }));
app.use("/assets", express.static("assets"));

/* ===============================
   ROUTES (LOCAL APIs)
================================ */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/vehicle", require("./routes/vehicleRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/ui-assets", require("./routes/uiAssetRoutes"));
app.use("/api/fastmovers", require("./routes/fastMoversRoutes"));
app.use("/api/highvalue", require("./routes/highValueRoutes"));
app.use("/api/electric", require("./routes/electricRoutes"));
app.use("/api/cng", require("./routes/cngRoutes"));
app.use("/api/only-with-us", require("./routes/onlyWithUsRoutes"));
app.use("/api/discontinue-model", require("./routes/discontinueModelRoutes"));
app.use("/api/eta", require("./routes/etaRoutes"));
app.use("/api/customer-eta", require("./routes/customerETARoutes"));

/* ===============================
   BACKEND AXIOS CLIENT
================================ */
const httpClient = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   PROXY HELPER
================================ */
async function proxyRequest(req, res, targetUrl) {
  try {
    console.log(`➡️ Proxy → ${targetUrl}`);

    const response = await httpClient.post(targetUrl, req.body, {
      auth: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });

    return res.json(response.data);
  } catch (error) {
    console.error("❌ Proxy Error:", error.message);

    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Upstream API failed" });
  }
}

/* ===============================
   PROXY ROUTES
================================ */
app.post("/api/parts-list", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://websprint.mytvspartsmart.in/catalog/api/v1/external/getPartsList"
  )
);

app.post("/api/related", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://websprint.mytvspartsmart.in/catalog/api/v1/external/getPartRelations"
  )
);

app.post("/api/vehicle-list", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://websprint.mytvspartsmart.in/catalog/api/v1/external/getVehicleList"
  )
);

app.post("/api/stock-list", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://websprint.mytvspartsmart.in/catalog/api/v1/external/getStockList"
  )
);

app.post("/api/filter", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://websprint.mytvspartsmart.in/catalog/api/v1/external/getMasterList"
  )
);

app.post("/api/search", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://websprint.mytvspartsmart.in/catalog/api/v1/external/generalSearch"
  )
);

app.post("/api/matertype", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://websprint.mytvspartsmart.in/catalog/api/v1/external/getMasterList"
  )
);

/* ===============================
   OCI IMAGE FETCH
================================ */
app.get("/api/oci/read", async (req, res) => {
  try {
    const fileName = req.query.name;

    if (!fileName) {
      return res.status(400).json({ message: "File name is required" });
    }

    const response = await axios.get(
      "https://websprint.mytvspartsmart.in/storage-service/api/v1/storage/oci/read",
      {
        params: { name: fileName },
        responseType: "arraybuffer",
        timeout: 30000,
        auth: {
          username: process.env.OCI_USERNAME,
          password: process.env.OCI_PASSWORD,
        },
      }
    );

    res.setHeader("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (error) {
    console.error("❌ OCI Image Error:", error.message);
    res.status(404).json({ message: "Image not found" });
  }
});
app.post("/api/create-sale-order", async (req, res) => {
  try {
    console.log("➡️ OIC Create Sale Order");

    const payload = Array.isArray(req.body) ? req.body[0] : req.body;

    const authHeader = Buffer.from(
      `${process.env.OIC_USERNAME}:${process.env.OIC_PASSWORD}`
    ).toString("base64");

    const response = await axios.post(
      "https://tasl-uat-oic-nrykozbvnktn-bo.integration.ocp.oraclecloud.com/ic/api/integration/v1/flows/rest/INT016_PARTSMAR_SALEORDE_IN/1.0/createsaleorder",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authHeader}`,
        },
        timeout: 60000,
      }
    );

    console.log("✅ OIC Order Accepted");

    return res.status(200).json({
      success: true,
      source_order_id: payload.source_order_id,
    });
  } catch (error) {
    console.error("❌ OIC ERROR:", error.response?.data || error.message);

    return res.status(401).json({
      success: false,
      message: "OIC authentication failed",
    });
  }
});

app.get("/api/order/status", async (req, res) => {
  try {
    const { source_order_id } = req.query;

    if (!source_order_id) {
      return res.status(400).json({ error: "source_order_id is required" });
    }

    const authHeader = Buffer.from(
      `${process.env.OIC_USERNAME}:${process.env.OIC_PASSWORD}`
    ).toString("base64");

    const response = await axios.get(
      `https://tasl-uat-oic-nrykozbvnktn-bo.integration.ocp.oraclecloud.com/ic/api/integration/v1/flows/rest/INT016_SALES_ORDER_CREATI_STATUS/1.0/saleorderstatus`,
      {
        params: {
          PMSoNum: source_order_id,
          DateFrom: "2026-01-01", // try a valid date
          DateTo: new Date().toISOString().split("T")[0],
        },
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    return res.json(response.data);
  } catch (err) {
    console.error("❌ Full Axios Error:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
    return res.status(500).json({ error: "Failed to get order status" });
  }
});

/* ===============================
   DATABASE + SERVER START
================================ */
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("✅ Database synced successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });
