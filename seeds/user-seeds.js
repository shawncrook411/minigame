const { User } = require("../models");

const userData = [
  {
    username: "john",
    email: "test@test1.com",
    password: "password1",
  },
  {
    username: "jane",
    email: "test2@test2.com",
    password: "password1",
  },
  {
    username: "pete",
    email: "test3@test3.com",
    password: "password1",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
