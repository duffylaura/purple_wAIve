const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Post extends Model { }
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img_url: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        keywords: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        style_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "style",
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },

    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post",
    }
);
module.exports = Post;
