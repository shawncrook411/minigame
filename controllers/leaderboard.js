const router = require("express").Router();
const { Score, User } = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const scoreData = await Score.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    const scores = scoreData.map((score) => score.get({ plain: true }));
    res.render("highscores", {
      scores,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
