const app = require("express").Router();

// Imported modular routes
const homeRouter = require("./home");
const apiRouter = require("./api");

app.use("/", homeRouter);
app.use("/api", apiRouter);


module.exports = app;
