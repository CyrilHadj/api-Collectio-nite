"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const User = require("./User");
exports.Role = sequelize.define("Role", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    importance: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});
exports.Role.hasOne(User);
User.belongsTo(exports.Role);
module.exports = exports.Role;
