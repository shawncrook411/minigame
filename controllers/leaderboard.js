const router = require("express").Router();
const { Score, User } = require("../models/index");

//gets scores
router.get("/", async (req, res) => {
  try {
    const scoreData = await Score.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    const scores = scoreData.map((score) => score.get({ plain: true }));
    //sorts by wins before sending to handlebars
    res.render("highscores", {
      connect4: scores.slice(0).sort((a, b) => b.connect4_win - a.connect4_win),
      snake: scores.slice(0).sort((a, b) => b.snake_score - a.snake_score),
      tictactoe: scores
        .slice(0)
        .sort((a, b) => b.tictactoe_win - a.tictactoe_win),
      currentUser: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
