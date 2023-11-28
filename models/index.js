const User = require("./User");
const Score = require("./Score");

User.hasOne(Score, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Score.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { Score, User };
