//importing modules
const User = require("./user");
const Post = require("./post");
const Tag = require("./tag");
const PostTag = require("./postTag");

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: "post_id",
});

Tag.belongsToMany(Post, {
  through: PostTag,
  foreignKey: "tag_id",
});

module.exports = { User, Post, Tag, PostTag };
