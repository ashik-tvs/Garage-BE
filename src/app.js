require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/database");

// ===== CORS Setup =====
// Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true // if you need cookies
}));

// ===== Body Parser =====
app.use(express.json());

// ===== Routes =====
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/vehicle", require("./routes/vehicleRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));

// ===== Database Connection =====
sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection error:", err));

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
