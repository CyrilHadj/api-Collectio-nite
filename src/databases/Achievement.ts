const { DataTypes } = require("sequelize");
const sequelize = require(".");

const User = require("./User");

const Achievement = sequelize.define("Achievement",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    description : {
        type : DataTypes.STRING,
        allowNull : false,
    }
});

Achievement.belongsToMany(User, {through : "user-achievement"});
User.belongsToMany(Achievement, {through : "user-achievement"});

module.exports = Achievement;