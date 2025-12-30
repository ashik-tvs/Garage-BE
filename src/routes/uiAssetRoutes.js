const express = require("express");
const router = express.Router();
const controller = require("../controllers/uiAssetController");

// GET /api/ui-assets
router.get("/", controller.getAllAssets);

// GET /api/ui-assets/:tag
router.get("/:tag", controller.getAssetByTag);

module.exports = router;
