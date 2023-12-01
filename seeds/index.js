const seedUsers = require("./user-seeds");
const seedScores = require("./scores-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedScores();
  process.exit(0);
};

seedAll();
