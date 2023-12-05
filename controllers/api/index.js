const router = require("express").Router();
const leaderboardRouter = require("./leaderboard");
const minigamesRouter = require("./minigames");

router.use("/leaderboard", leaderboardRouter);
router.use("/minigames", minigamesRouter);

module.exports = router;
