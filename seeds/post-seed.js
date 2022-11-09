const { Post } = require("../models");

const postSeed = [
  {
    title: "californication",
    img_url: "https://via.placeholder.com/512",
    body: "this how i feel about this song",
    user_id: 1,
  },
  {
    title: "californication",
    img_url: "https://via.placeholder.com/512",
    body: "this how i feel about this song",
    user_id: 2,
  },
  {
    title: "californication",
    img_url: "https://via.placeholder.com/512",
    body: "this how i feel about this song",
    user_id: 3,
  },
  {
    title: "californication",
    img_url: "https://via.placeholder.com/512",
    body: "this how i feel about this song",
    user_id: 2,
  },
  {
    title: "californication",
    img_url: "https://via.placeholder.com/512",
    body: "this how i feel about this song",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postSeed);

module.exports = seedPosts;
