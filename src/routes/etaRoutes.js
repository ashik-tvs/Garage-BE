const express = require("express");
const router = express.Router();
const etaController = require("../controllers/etaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, etaController.getCustomerETA);

module.exports = router;
