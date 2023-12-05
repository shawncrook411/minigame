const app = require("express").Router();

// Imported modular routes
const contactRouter = require("./contact");
const homeRouter = require("./home");
const lbRouter = require("./leaderboard");
const snakeRoute = require('./snake')

app.use("/contact", contactRouter);
app.use("/", homeRouter);
app.use("/leaderboard", lbRouter);
app.use('/snake', snakeRoute);

module.exports = app;
