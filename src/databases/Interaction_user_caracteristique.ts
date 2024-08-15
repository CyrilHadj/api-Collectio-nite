const { DataTypes } = require("sequelize");
const sequelize = require(".");


const User = require("./User");
const Caracteristique = require("./Caracteristique");

const Interaction_caracteristique = sequelize.define("Interaction_user_caracteristique",{
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

Interaction_caracteristique.hasMany(User);
User.belongsTo(Interaction_caracteristique);

Interaction_caracteristique.hasMany(Caracteristique);
Caracteristique.belongsTo(Interaction_caracteristique);

module.exports = Interaction_caracteristique;