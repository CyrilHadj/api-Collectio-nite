const { DataTypes } = require("sequelize");
const sequelize = require(".");


const Item = require("./Item");
const Collection = require("./Collection");
const User = require("./User");

const Image = sequelize.define("Image",{
    url : {
        type : DataTypes.STRING,
        allowNull : false
    },
})

Image.hasMany(Collection);
Collection.belongsTo(Image)

Image.belongsToMany(Item, {through:"item-image"});
Item.belongsToMany(Image, {through:"item-image"});

Image.hasMany(User);
User.belongsTo(Image)

module.exports = Image