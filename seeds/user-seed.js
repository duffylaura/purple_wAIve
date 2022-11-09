const { User } = require("../models");

const userSeed = [
  {
    username: "John Doe",
    email: "johndoe@gmail.com",
    password: "password",
  },
  {
    username: "Jane Doe",
    email: "janedoe@gmail.com",
    password: "password123",
  },
  {
    username: "Mike Smith",
    email: "mikesmith@gmail.com",
    password: "password321",
  },
];

const seedUsers = () => User.bulkCreate(userSeed);

module.exports = seedUsers;
