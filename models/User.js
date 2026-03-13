const {DataTypes} = require("sequelize");
const sequalize = require("../config/db");

const User = sequalize.define("User",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    password : {
        type :  DataTypes.STRING,
        allowNull : false,
    },
    role : {
        type : DataTypes.ENUM("admin","manager","worker"),
        allowNull : false,
        defaultValue : "worker",
    }
},{
    timestamps : true,
    createdAt : "created_at",
    updatedAt : false,
});

module.exports = User;