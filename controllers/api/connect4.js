const router = require("express").Router();
const { connect4Weights } = require("../../utils/random");
const { Score } = require("../../models/index");

router.put("/placement", (req, res) => {
  const game = req.body;
  const response = connect4Weights(game);
  res.json(response);
});

router.put("/record", async (req, res) => {
  try {
    if (!req.session.user_id) {
      res.status(200).json({ message: "not logged in" });
      return;
    }

    const oldScore = await Score.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });
    if (!oldScore) {
      if (req.body.result == "Win") {
        var scoreData = await Score.create({
          user_id: req.session.user_id,
          connect4_win: 1,
        });
      } else if (req.body.result == "Loss") {
        var scoreData = await Score.create({
          user_id: req.session.user_id,
          connect4_loss: 1,
        });
      } else {
        var scoreData = await Score.create({
          user_id: req.session.user_id,
          connect4_win: 0,
          connect4_loss: 0,
        });
      }
    } else {
      if (req.body.result === "Win") {
        var scoreData = await Score.update(
          {
            connect4_win: oldScore.connect4_win + 1,
          },
          {
            where: { user_id: req.session.user_id },
          }
        );
      } else if (req.body.result === "Loss") {
        var scoreData = await Score.update(
          {
            connect4_loss: oldScore.connect4_loss + 1,
          },
          {
            where: { user_id: req.session.user_id },
          }
        );
      } else {
        var scoreData = oldScore;
      }
    }
    res.status(200).json(scoreData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
