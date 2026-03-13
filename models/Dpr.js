const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Dpr = sequelize.define("Dpr", {
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Projects",
            key: "id",
        },  
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        },
    },
    date: { 
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    work_description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    weather : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    worker_count : {
        type : DataTypes.INTEGER,
        allowNull : false,  
    }
}, {
    timestamps: true,
    createdAt : "created_at",
    updatedAt: false,
});

module.exports = Dpr;