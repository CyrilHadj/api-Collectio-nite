"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const User = require("./User");
const Role = sequelize.define("Role", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    importance: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});
Role.hasOne(User);
User.belongsTo(Role);
module.exports = Role;
