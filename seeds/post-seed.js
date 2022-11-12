const { Post } = require("../models");

const postSeed = [
  {
    title: "californication",
    img_url: "/assets/ex1.png",
    body: "this how i feel about this song",
    keywords: "Happy, Sunny, Bright, Trippy",
    style_id: 2,
    user_id: 1,
  },
  {
    title: "californication",
    img_url: "/assets/ex2.png",
    body: "this how i feel about this song",
    keywords: "Happy, Sunny, Bright, Bittersweet",
    style_id: 5,
    user_id: 2,
  },
  {
    title: "This is Halloween",
    img_url: "/assets/ex3.png",
    body: "this how i feel about this song",
    keywords: "Midnight, Soothing, Mysterious",
    style_id: 23,
    user_id: 3,
  },
  {
    title: "Full Circle",
    img_url: "/assets/ex4.png",
    body: "this how i feel about this song",
    keywords: "Midnight, Soothing, Mysterious",
    style_id: 17,
    user_id: 2,
  },
  {
    title: "Bohemiadn Rhapsody",
    img_url: "/assets/ex5.png",
    body: "this how i feel about this song",
    keywords: "Midnight, Soothing, Mysterious",
    style_id: 15,
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postSeed);

module.exports = seedPosts;
