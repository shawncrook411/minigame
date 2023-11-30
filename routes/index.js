const express = require('express');

// Imported modular routes 
const homeRouter = require('./home');
const gamesRouter = require('./minigames');

const app = express();

app.use('/home', homeRouter);
app.use('/minigames', gamesRouter);


module.exports = app;