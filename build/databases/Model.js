"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Model = sequelize.define("Model", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
module.exports = Model;
