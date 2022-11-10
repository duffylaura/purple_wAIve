const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");

class User extends Model {
    comparePW(uPW) {
        console.log(uPw) //what we passed
        console.log(this.password); //what is hashed saved in db
        return bcryptcompare(uPW, this.password); //compare, return boolean
    };
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4],
        },
    },

},
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10)
                return newUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",

    }
);
module.exports = User;