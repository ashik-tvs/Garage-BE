const express = require("express");
const router = express.Router();
const { customerETA } = require("../controllers/customerETAController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, customerETA);

module.exports = router;
