const { DataTypes } = require("sequelize");
const sequelize = require(".");

const User = require("./User");

const Communaute = sequelize.define("Communaute",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    theme : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    description : {
        type : DataTypes.STRING,
        allowNull : false,
    }
})

Communaute.belongsToMany(User, {through : "user-communaute"});
User.belongsToMany(Communaute, {through : "user-communaute"});


module.exports = Communaute;