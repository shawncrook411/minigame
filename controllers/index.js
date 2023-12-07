const app = require("express").Router();

// Imported modular routes
const homeRouter = require("./home");
const apiRouter = require("./api/index");
const leaderboardRoute = require("./leaderboard");

app.use("/", homeRouter);
app.use("/api", apiRouter);
app.use("/leaderboard", leaderboardRoute);

module.exports = app;
