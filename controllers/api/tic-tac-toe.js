const router = require('express').Router();
const { tic_tac_toe_Weights } = require('../../utils/random')

router.put('/placement', (req, res) => {
    const game = req.body
    const response = tic_tac_toe_Weights(game)
    res.json(response)
})

module.exports = router;