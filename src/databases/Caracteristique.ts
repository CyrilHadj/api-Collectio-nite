const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Model = require("./Model");
const Item = require("./Item");


const Caracteristique = sequelize.define("Caracteristique",{
    title : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    subtitle : {
        type : DataTypes.STRING,
        allowNull : true,
    }
})

Caracteristique.belongsToMany(Model, {through : "model-caracteristique"});
Model.belongsToMany(Caracteristique, {through : "model-caracteristique"});




module.exports = Caracteristique;