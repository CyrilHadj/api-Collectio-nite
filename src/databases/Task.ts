const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Model = require("./Model");



const Task = sequelize.define("Task",{
    title : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    completed : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
    }
})

Task.belongsToMany(Model, {through : "model-task"});
Model.belongsToMany(Task, {through : "model-task"});


module.exports = Task;