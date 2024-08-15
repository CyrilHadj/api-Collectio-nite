const { DataTypes } = require("sequelize");
const sequelize = require(".");


const User = require("./User");
const Collection = require("./Collection");

const Interaction_collection = sequelize.define("Interaction_user_collection",{
    like : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
    },
    dislike : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
    },
    post : {
        type : DataTypes.STRING,
        allowNull : false,
    },
})

Interaction_collection.hasMany(User);
User.belongsTo(Interaction_collection);

Interaction_collection.hasMany(Collection);
Collection.belongsTo(Interaction_collection);

module.exports = Interaction_collection;