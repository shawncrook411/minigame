const router = require("express").Router();
const tic_tac_toe_Router = require("./tic-tac-toe");
const userRouter = require("./user-router");
const snakeRoute = require("./snake");

router.use("/user", userRouter);
router.use("/snake", snakeRoute);
router.use("/tic-tac-toe", tic_tac_toe_Router);

module.exports = router;
