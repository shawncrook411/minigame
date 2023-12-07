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
    scores.sort((a, b) => b.snake_wins - a.snake_wins);
    res.render("highscores", {
      scores,
      currentUser: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
