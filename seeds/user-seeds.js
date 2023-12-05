const { User } = require("../models");

const userData = [
  {
    username: "john",
    password: "password1",
  },
  {
    username: "jane",
    password: "password1",
  },
  {
    username: "pete",
    password: "password1",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
