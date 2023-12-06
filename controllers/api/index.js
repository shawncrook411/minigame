const router = require("express").Router();
const minigamesRouter = require("./minigames-router");
const userRouter = require("./user-router");
const snakeRoute = require("./snake");

router.use("/minigames", minigamesRouter);
router.use("/user", userRouter);
router.use("/snake", snakeRoute);

module.exports = router;
