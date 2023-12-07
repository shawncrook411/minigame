const router = require("express").Router();
const Snake = require("../../public/games/snake/game.js");
const { snakeWeights } = require("../../utils/random");
const { Score, User } = require("../../models/index.js");
const withAuth = require("../../public/utils/auth.js");

router.put("/newApple", (req, res) => {
  try {
    const snake = req.body;
    const response = snakeWeights(snake);

    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/record", async (req, res) => {
  try {
    const oldScore = await Score.findOne({
      where: {
        user_id: req.session.id,
      },
    });
    console.log(oldScore, req.body);
    if (oldScore < req.body) {
      var scoreData = await Score.update(
        {
          snake_score: req.body.snake_score,
        },
        {
          where: { user_id: req.session.id },
        }
      );
    } else {
      var scoreData = oldScore;
    }
    if (!scoreData) {
      res.status(404).json({ message: "No score found with this id" });
      return;
    }
    res.status(200).json(scoreData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
