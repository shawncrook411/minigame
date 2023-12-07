const router = require("express").Router();
const userRouter = require("./user-router");
const snakeRoute = require("./snake");

router.use("/user", userRouter);
router.use("/snake", snakeRoute);

module.exports = router;
