"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const User = require("./User");
const Collection = require("./Collection");
const Interaction_collection = sequelize.define("Interaction_user_collection", {
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
User.hasMany(Interaction_collection);
Interaction_collection.belongsTo(User);
Collection.hasMany(Interaction_collection);
Interaction_collection.belongsTo(Collection);
module.exports = Interaction_collection;
