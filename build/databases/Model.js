"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const item = require("./Item");
const Model = sequelize.define("Model", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
Model.belongsToMany(item, { through: "item-model" });
item.belongsToMany(Model, { through: "item-model" });
module.exports = Model;
