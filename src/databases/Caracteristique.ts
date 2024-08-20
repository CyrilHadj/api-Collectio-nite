const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Model = require("./Model");
const Item = require("./Item");

const Caracteristique = sequelize.define("Caracteristique",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    }
})

Caracteristique.hasOne(Model);
Model.belongsTo(Caracteristique)

module.exports = Caracteristique;