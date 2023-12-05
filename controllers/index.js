const app = require("express").Router();

// Imported modular routes
const contactRouter = require("./contact");
const homeRouter = require("./home");
const apiRouter = require("./api/index");

app.use("/contact", contactRouter);
app.use("/", homeRouter);
app.use("/api", apiRouter);


module.exports = app;
