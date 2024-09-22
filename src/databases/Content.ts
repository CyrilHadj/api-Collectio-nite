const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Model = require("./Model");
const Item = require("./Item");


const Content = sequelize.define("Content",{
    title : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    text : {
        type : DataTypes.STRING,
        allowNull : true,
    }
})

Content.belongsToMany(Model, {through : "model-content"});
Model.belongsToMany(Content, {through : "model-content"});

module.exports = Content;