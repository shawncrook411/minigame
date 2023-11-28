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
      type: DataTypes.NUMBER,
    },
    tictactoe_loss: {
      type: DataTypes.NUMBER,
    },
    snake_win: {
      type: DataTypes.NUMBER,
    },
    snake_loss: {
      type: DataTypes.NUMBER,
    },
    connect4_win: {
      type: DataTypes.NUMBER,
    },
    connect4_loss: {
      type: DataTypes.NUMBER,
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
