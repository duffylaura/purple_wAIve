//importing modules
const User = require("./user");
const Post = require("./post");
const Style = require("./style");

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


module.exports = { User, Post, Style };
