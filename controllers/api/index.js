const router = require("express").Router();
const leaderboardRouter = require("./leaderboard-router");
const minigamesRouter = require("./minigames-router");
const userRouter = require("./user-router");

router.use("/leaderboard", leaderboardRouter);
router.use("/minigames", minigamesRouter);
router.use("/user", userRouter);

module.exports = router;
