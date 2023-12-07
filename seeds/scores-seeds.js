const { Score } = require("../models");

const scoreData = [
  {
    tictactoe_win: 1,
    tictactoe_loss: 5,
    snake_wins: 6,
    snake_loss: 7,
    connect4_win: 2,
    connect4_loss: 3,
    user_id: 1,
  },
  {
    tictactoe_win: 3,
    tictactoe_loss: 7,
    snake_wins: 8,
    snake_loss: 0,
    connect4_win: 8,
    connect4_loss: 3,
    user_id: 2,
  },
  {
    tictactoe_win: 0,
    tictactoe_loss: 0,
    snake_wins: 2,
    snake_loss: 4,
    connect4_win: 3,
    connect4_loss: 7,
    user_id: 3,
  },
];

const seedScores = () => Score.bulkCreate(scoreData);

module.exports = seedScores;
