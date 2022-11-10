const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Style extends Model { }
Style.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  style_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "style",
  });
module.exports = Style; 