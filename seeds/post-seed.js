const { Post } = require("../models");

const postSeed = [
  {
    title: "John Doe",
    img_url: "johndoe@gmail.com",
    body: "password",
  },
  {
    img_url: "Jane Doe",
    email: "janedoe@gmail.com",
    password: "password123",
  },
  {
    username: "Mike Smith",
    email: "mikesmith@gmail.com",
    password: "password321",
  },
];

const seedPosts = () => Post.bulkCreate(postSeed);

module.exports = seedPosts;
