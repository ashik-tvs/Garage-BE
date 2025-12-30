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
    "https://uat-websprint.mytvspartsmart.in/catalog/api/v1/external/getPartsList"
  )
);

app.post("/api/related", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://uat-websprint.mytvspartsmart.in/catalog/api/v1/external/getPartRelations"
  )
);

app.post("/api/vehicle-list", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://uat-websprint.mytvspartsmart.in/catalog/api/v1/external/getVehicleList"
  )
);

app.post("/api/stock-list", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://uat-websprint.mytvspartsmart.in/catalog/api/v1/external/getStockList"
  )
);

app.post("/api/filter", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://uat-websprint.mytvspartsmart.in/catalog/api/v1/external/getMasterList"
  )
);

app.post("/api/search", (req, res) =>
  proxyRequest(
    req,
    res,
    "https://uat-websprint.mytvspartsmart.in/catalog/api/v1/external/generalSearch"
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

/* ===============================
   DATABASE + SERVER START
================================ */
sequelize
  .sync({ alter: true })
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
