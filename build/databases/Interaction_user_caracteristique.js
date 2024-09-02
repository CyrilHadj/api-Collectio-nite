"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const User = require("./User");
const Caracteristique = require("./Caracteristique");
const Interaction_caracteristique = sequelize.define("Interaction_user_caracteristique", {
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
User.hasMany(Interaction_caracteristique);
Interaction_caracteristique.belongsTo(User);
Caracteristique.hasMany(Interaction_caracteristique);
Interaction_caracteristique.belongsTo(Caracteristique);
module.exports = Interaction_caracteristique;
