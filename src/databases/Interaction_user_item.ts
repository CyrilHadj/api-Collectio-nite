const { DataTypes } = require("sequelize");
const sequelize = require(".");


const User = require("./User");
const Item = require("./Item");

const Interaction_item = sequelize.define("Interaction_user_item",{
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
Interaction_item.hasMany(User);
User.belongsTo(Interaction_item);

Interaction_item.hasMany(Item);
Item.belongsTo(Interaction_item);

module.exports = Interaction_item;