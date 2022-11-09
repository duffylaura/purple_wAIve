//importing modules 
const User = require('.user');
const Post = require('./post');
const Tag = require('./tag');

User.hadMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Post.hasMany(Tag, {
    foreignKey: 'tag_id'
});

Tag.belongsToMany(Post, {
    foreignKey: 'post_id'
});

module.expoerts = { User, Post, Tag };
