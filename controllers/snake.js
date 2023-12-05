const router = require("express").Router();
const Snake = require('../public/games/snake')
const { Options } = require('../public/games/game').default   

router.get('/', (req, res) => {
    res.render('snake', { layout: 'main' });
})

router.put('/newSnake', (req, res) => {
    let options = new Options(5, 5, true)
    const snakeResponse = new Snake(options)
    res.json(snakeResponse)
})

module.exports = router
