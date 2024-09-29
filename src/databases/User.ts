const { DataTypes } = require("sequelize");
const sequelize = require(".");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const Collection = require("./Collection")
const Category = require("./Category")


const User = sequelize.define("User",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        set(value){
            const hashedPassword = bcrypt.hashSync(value, saltRounds);
            this.setDataValue('password', hashedPassword)
        },
        allowNull : false,
        unique : true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    }

});

Collection.belongsToMany(User, {through:"user-collection"});
User.belongsToMany(Collection, {through:"user-collection"});


Category.belongsToMany(User, {through : "user-category"});
User.belongsToMany(Category, {through : "user-category"});


module.exports = User ;