//importing modules
const User = require("./user");
const Post = require("./post");
const Style = require("./style");
const Comment = require("./comment");

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Style.hasMany(Post, {
  foreignKey: "style_id",
});

Post.belongsTo(Style, {
  foreignKey: "style_id",
  onDelete: "CASCADE",
});

//comment belongto user
Comment.belongsTo(User, {
  foreignKey: "user_id",
  // as: "comment_username",
});
//user has many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  // as: "comment_username",
});

//blogpost has many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

//comment belongs to blogpost

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Style, Comment };
