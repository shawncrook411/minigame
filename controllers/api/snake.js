const router = require("express").Router();
const { snakeWeights } = require("../../utils/random");
const { Score, User } = require("../../models/index.js");
const withAuth = require("../../public/utils/auth.js");

router.put("/newApple", (req, res) => {
  try {
    const snake = req.body;
    const response = snakeWeights(snake);

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/record", async (req, res) => {
  try {
    if (!req.session.loggedIn || !req.session.user_id) {
      res.status(200).json({ message: "not logged in" });
      return;
    }

    const oldScore = await Score.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });
    if (!oldScore) {
      const newScore = await Score.create({
        user_id: req.session.user_id,
        snake_score: req.body.snake_score,
      });
      var scoreData = newScore;
    } else if (oldScore.snake_score < req.body.snake_score) {
      var scoreData = await Score.update(
        {
          snake_score: req.body.snake_score,
        },
        {
          where: { user_id: req.session.user_id },
        }
      );
    } else {
      var scoreData = oldScore;
    }
    res.status(200).json(scoreData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
