const { User } = require("../models");

const userSeed = [
  {
    username: "JohnDoe",
    email: "johndoe@gmail.com",
    password: "password",
  },
  {
    username: "JaneDoe",
    email: "janedoe@gmail.com",
    password: "password123",
  },
  {
    username: "MikeSmith",
    email: "mikesmith@gmail.com",
    password: "password321",
  },
];

const seedUsers = () => User.bulkCreate(userSeed);

module.exports = seedUsers;
