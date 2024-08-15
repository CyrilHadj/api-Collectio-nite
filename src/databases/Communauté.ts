const { DataTypes } = require("sequelize");
const sequelize = require(".");

const User = require("./User");

const Communauté = sequelize.define("Communauté",{
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

Communauté.belongsToMany(User, {through : "item-collection"});
User.belongsToMany(Communauté, {through : "item-collection"});


module.exports = Communauté;