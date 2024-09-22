"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const User = require("./User");
const Communaute = require("./Communaute");
const Interaction_communaute = sequelize.define("Interaction_user_communaute", {
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
User.hasMany(Interaction_communaute);
Interaction_communaute.belongsTo(User);
Communaute.hasMany(Interaction_communaute);
Interaction_communaute.belongsTo(Communaute);
module.exports = Interaction_communaute;
