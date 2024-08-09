"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionRouter = void 0;
const sequelize_1 = require("sequelize");
const express = require("express");
exports.collectionRouter = express.Router();
const Collection = require("../databases/Collection");
exports.collectionRouter.get("/all", async (request, reponse) => {
    const collections = await Collection.findAll()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (collections) {
        reponse.status(200).json(collections);
    }
    else {
        reponse.status(400).json("an error has occured");
    }
});
exports.collectionRouter.get("/:id", async (request, reponse) => {
    const collection = await Collection.findByPk(request.params.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (collection) {
        reponse.status(200).json(collection);
    }
    else {
        reponse.status(400).json("an error has occured");
    }
});
exports.collectionRouter.get("/search/:input", async (request, reponse) => {
    const search = request.params.input;
    const collection = await Collection.findAll({
        where: {
            name: { [sequelize_1.Op.like]: "%" + search + "%" }
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (collection) {
        reponse.status(200).json(collection);
    }
    else {
        reponse.status(400).json("an error has occured");
    }
});
exports.collectionRouter.get("/category/:categoryId", async (request, reponse) => {
    const categoryId = request.params.categoryId;
    const collection = await Collection.findAll({
        where: {
            CategoryId: categoryId
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (collection) {
        reponse.status(200).json(collection);
    }
    else {
        reponse.status(400).json("an error has occured");
    }
});
exports.collectionRouter.post("/", async (request, reponse) => {
    const bodyCollection = request.body;
    const collection = await Collection.create({
        name: bodyCollection.name,
        description: bodyCollection.description
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(collection);
});
exports.collectionRouter.delete("/:id", async (request, reponse) => {
    const collectionId = request.params.id;
    await Collection.destroy({
        where: {
            id: collectionId
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("collection has been deleted");
});
exports.collectionRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const collection = await Collection.findByPk(modification.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    collection.name = modification.name;
    collection.description = modification.description;
    if (collection) {
        await collection.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json({
            message: "product has been modified",
            data: collection
        });
    }
    else {
        reponse.status(400).json("an error has occured");
    }
});
