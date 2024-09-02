"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const User = require("./User");
const Item = require("./Item");
const Interaction_item = sequelize.define("Interaction_user_item", {
    like: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    dislike: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    post: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
User.hasMany(Interaction_item);
Interaction_item.belongsTo(User);
Item.hasMany(Interaction_item);
Interaction_item.belongsTo(Item);
module.exports = Interaction_item;
