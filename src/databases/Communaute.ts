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

Communaute.belongsToMany(User, {through : "item-collection"});
User.belongsToMany(Communaute, {through : "item-collection"});


module.exports = Communaute;