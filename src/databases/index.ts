import { Sequelize, DataTypes } from "sequelize";

import { readFileSync } from "node:fs";

const password = readFileSync("password.txt")

const login = {
    database : "collectio-nite",
    username : "cyril",
    password : JSON.stringify(password)
}

export const sequelize = new Sequelize(login.database, login.username, login.password,{
    host : "localhost",
    dialect : "mysql",
    logging : false
})

sequelize.authenticate()
.then(()=>{
    console.log("Connexion a la base de donnée réussi")
})
.catch(error=>console.log(error));

sequelize.sync({ force: false });