const { DataTypes } = require("sequelize");
const sequelize = require(".");


const User = require("./User");
const Communauté = require("./Communauté");

const Interaction_communauté = sequelize.define("Interaction_user_communauté",{
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

Interaction_communauté.hasMany(User);
User.belongsTo(Interaction_communauté);

Interaction_communauté.hasMany(Communauté);
Communauté.belongsTo(Interaction_communauté);

module.exports = Interaction_communauté;