"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Collection = sequelize.define("Collection", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
module.exports = Collection;
