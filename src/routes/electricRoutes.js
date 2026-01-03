const router = require("express").Router();
const controller = require("../controllers/electricController");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/segment/:segment_id", controller.getBySegment);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
