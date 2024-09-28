"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const node_fs_1 = require("node:fs");
const credential = JSON.parse((0, node_fs_1.readFileSync)("../credential.json", { encoding: "utf8" }));
const login = {
    database: credential.dbName,
    username: credential.username,
    password: credential.password
};
exports.sequelize = new sequelize_1.Sequelize(login.database, login.username, login.password, {
    host: "localhost",
    dialect: "mysql",
    logging: false
});
exports.sequelize.authenticate()
    .then(async () => {
    console.log("Connexion a la base de donnée réussi");
})
    .catch(error => console.log(error));
module.exports = exports.sequelize;
exports.sequelize.sync({ force: false });
