"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const sequelize_1 = require("sequelize");
const express = require("express");
exports.categoryRouter = express.Router();
const Category = require("../databases/Category");
exports.categoryRouter.get("/all", async (request, reponse) => {
    const categories = await Category.findAll()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (categories) {
        reponse.status(200).json(categories);
    }
    else {
        reponse.status(400).json("cannot get all categories");
    }
    ;
});
exports.categoryRouter.get("/:id", async (request, reponse) => {
    const category = await Category.findByPk(request.params.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (category) {
        reponse.status(200).json(category);
    }
    else {
        reponse.status(404).json("cannot find category");
    }
});
exports.categoryRouter.get("/search/:input", async (request, reponse) => {
    const search = request.params.input;
    const category = await Category.findAll({
        where: {
            name: { [sequelize_1.Op.like]: "%" + search + "%" }
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (category) {
        reponse.status(200).json(category);
    }
    else {
        reponse.status(404).json("cannot find category");
    }
});
exports.categoryRouter.post("/", async (request, reponse) => {
    const bodyCategory = request.body;
    const category = await Category.create({
        name: bodyCategory.name
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(category);
});
exports.categoryRouter.delete("/:id", async (request, reponse) => {
    const categoryId = request.params.id;
    Category.destroy({
        where: {
            id: categoryId
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("Category has been deleted");
});
exports.categoryRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const category = await Category.findByPk(modification.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    console.log(category);
    category.name = modification.name;
    if (category) {
        await category.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("Category :" + category + "has been modified");
    }
    else {
        reponse.status(404).json("an error has occured");
    }
});
