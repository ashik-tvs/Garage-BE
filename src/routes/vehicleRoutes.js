const router = require("express").Router();
const vehicleControllers = require("../controllers/vehicleController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/dashboard-assets", authMiddleware, vehicleControllers.dashboardAssets);

module.exports = router;
