const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const profileController = require("../controllers/profileController");

router.get("/", authMiddleware, profileController.getProfile);
router.put("/", authMiddleware, profileController.updateProfile);

module.exports = router;
