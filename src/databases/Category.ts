const { DataTypes } = require("sequelize");
const sequelize = require(".");



const Category = sequelize.define("Category",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
})

module.exports = Category;