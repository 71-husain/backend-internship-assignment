const sequelize = require("../config/db");
const User = require("./user");
const Dpr = require("./Dpr");
const Project = require("./Project");

// associations
User.hasMany(Project, { foreignKey: "created_by" });
Project.belongsTo(User, { foreignKey: "created_by" });

User.hasMany(Dpr, { foreignKey: "user_id" });
Dpr.belongsTo(User, { foreignKey: "user_id" });

Project.hasMany(Dpr, { foreignKey: "project_id" });
Dpr.belongsTo(Project, { foreignKey: "project_id" });

module.exports = {
    sequelize,
    User,
    Dpr,
    Project,
};  