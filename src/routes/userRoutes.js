const router = require("express").Router();
const userControllers = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, userControllers.createUser);
router.get("/", authMiddleware, userControllers.listUsers);

module.exports = router;
