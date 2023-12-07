const router = require('express').Router();
const { connect4Weights } = require('../../utils/random')

router.put('/placement', (req, res) => {
    const game = req.body
    const response = connect4Weights(game)
    res.json(response)
})

module.exports = router;