"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Item = require("./Item");
const Collection = require("./Collection");
const User = require("./User");
const Model = require("./Model");
const Image = sequelize.define("Image", {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
Image.hasMany(Collection);
Collection.belongsTo(Image);
Image.belongsToMany(Item, { through: "item-image" });
Item.belongsToMany(Image, { through: "item-image" });
Image.hasMany(User);
User.belongsTo(Image);
Image.belongsToMany(Model, { through: "model-images" });
Model.belongsToMany(Image, { through: "model-images" });
module.exports = Image;
