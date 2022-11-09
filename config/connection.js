const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;
// using JAWSDB because its a Heroku add-on that provides a fully functional MySQL database server for use with your Heroku application
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
