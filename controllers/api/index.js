const router = require("express").Router();
const tic_tac_toe_Router = require("./tic-tac-toe");
const userRouter = require("./user-router");
const snakeRoute = require("./snake");
const connect4Router = require("./connect4")

router.use("/user", userRouter);
router.use("/snake", snakeRoute);
router.use("/tic-tac-toe", tic_tac_toe_Router);
router.use("/connect4", connect4Router)

module.exports = router;
