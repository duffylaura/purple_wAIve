const { Comment } = require("../models");

const commentData = [
  {
    text: "I agree 100%!",
    user_id: 1,
    post_id: 1,
  },
  {
    text: "You're a loser!",
    user_id: 2,
    post_id: 1,
  },
  {
    text: "No, You're a loser! You're the one commenting on a blogpost",
    user_id: 1,
    post_id: 1,
  },
  {
    text: "very nice!",
    user_id: 2,
    post_id: 2,
  },
  {
    text: "4rt345t345t45",
    user_id: 1,
    post_id: 2,
  },
  {
    text: "cool blog!",
    user_id: 3,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
