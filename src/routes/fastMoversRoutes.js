const express = require("express");
const router = express.Router();
const controller = require("../controllers/fastMoversController");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/segment/:segment_id", controller.getBySegment);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
