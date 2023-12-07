const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Score extends Model {}

Score.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tictactoe_win: {
      type: DataTypes.INTEGER,
    },
    tictactoe_loss: {
      type: DataTypes.INTEGER,
    },
    snake_wins: {
      type: DataTypes.INTEGER,
    },
    snake_loss: {
      type: DataTypes.INTEGER,
    },
    connect4_win: {
      type: DataTypes.INTEGER,
    },
    connect4_loss: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "score",
  }
);

module.exports = Score;
