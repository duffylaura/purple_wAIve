const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Tag extends Model {}
Tag.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tag_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      

},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  });
  module.exports = Tag; 