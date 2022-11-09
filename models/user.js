const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class user extends Model{

}

user.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

})