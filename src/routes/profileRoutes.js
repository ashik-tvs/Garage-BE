const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const controller = require("../controllers/profileController");

router.get("/", auth, controller.getProfile);
router.put("/", auth, controller.updateProfile);

module.exports = router;
