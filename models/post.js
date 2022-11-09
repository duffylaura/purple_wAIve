const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}
Post.init({
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
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },

        tag_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "tag",
              key: "id",
            },
            
    }}
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);
module.exports = Post;