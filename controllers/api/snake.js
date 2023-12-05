const router = require("express").Router();
const Snake = require('../../public/games/snake')
const { snakeWeights } = require('../../utils/random')

router.put('/newApple', (req, res) => {
    try {
        const snake = req.body
        const response = snakeWeights(snake)
        
        res.json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router
