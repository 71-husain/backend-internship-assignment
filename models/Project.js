const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Project = sequelize.define("Project",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    description : {
        type : DataTypes.TEXT,
        allowNull : false,  
    },
    start_date : {
        type : DataTypes.DATE,
        allowNull : false,
    },
    end_date : {
        type : DataTypes.DATE,
        allowNull : false,  
    },
    status : { 
        type : DataTypes.ENUM("planned","active","completed"),
        allowNull : false,
        defaultValue : "planned"
    },
    created_by : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : "Users",
            key : "id",     
        }
    }
},{
    timestamps : true,
    createdAt : "created_at",
    updatedAt : false,
});

module.exports = Project;
