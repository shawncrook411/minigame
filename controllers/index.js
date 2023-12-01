const app = require("express").Router();

// Imported modular routes
const contactRouter = require("./contact");
const homeRouter = require("./home");
const lbRouter = require("./leaderboard");
const gamesRouter = require("./minigames");

app.use("/contact", contactRouter);
app.use("/", homeRouter);
app.use("/leaderboard", lbRouter);
app.use("/minigames", gamesRouter);

module.exports = app;
