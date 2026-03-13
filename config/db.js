const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "internship_db",
  "root",
  "Husain@95",
  {
    host: "localhost",
    dialect: "mysql"
  }
);

async function ConnectDb(){
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

ConnectDb();
module.exports = sequelize;