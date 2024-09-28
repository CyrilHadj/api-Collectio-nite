"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = require("../databases/Role");
async function initializeRoles() {
    try {
        await Role_1.Role.findOrCreate({
            where: { name: 'user' },
            defaults: { name: 'user' }
        });
        await Role_1.Role.findOrCreate({
            where: { name: 'admin' },
            defaults: { name: 'admin' }
        });
        console.log("Roles already exist");
    }
    catch (error) {
        console.error("Error during creation of Roles", error);
    }
}
module.exports = initializeRoles();
