const lb = require('express').Router();
const { v4: uuidv4 } = require('uuid');
// const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

lb.get('/', (req, res) => {
    res.render('highscores', { layout: 'main' });
});




module.exports = lb;