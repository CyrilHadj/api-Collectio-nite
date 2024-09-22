"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const User = require("./User");
const Communauté = require("./Communaute");
const Interaction_communauté = sequelize.define("Interaction_user_communauté", {
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
Interaction_communauté.hasMany(User);
User.belongsTo(Interaction_communauté);
Interaction_communauté.hasMany(Communauté);
Communauté.belongsTo(Interaction_communauté);
module.exports = Interaction_communauté;
