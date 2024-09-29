import { Sequelize, DataTypes } from "sequelize";

import { readFileSync } from "node:fs";


const credential = JSON.parse(readFileSync("../credential.json",
    {encoding : "utf8"}
)) 

const login = {
    database : credential.dbName,
    username : credential.username,
    password : credential.password
}

export const sequelize = new Sequelize(login.database, login.username, login.password,{
    host : "localhost",
    dialect : "mysql",
    logging : false
})

sequelize.authenticate()
.then(async ()=>{
    console.log("Connexion a la base de donnée réussi")

   
})
.catch(error=>console.log(error));

module.exports = sequelize;

sequelize.sync({ force: false });