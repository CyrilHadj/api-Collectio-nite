"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express = require("express");
exports.imageRouter = express.Router();
const Item = require("../databases/Item");
const Collection = require("../databases/Collection");
const Image = require("../databases/Image");
const User = require("../databases/User");
exports.imageRouter.get("/:id", async (request, reponse) => {
    const imageId = request.params.id;
    const image = await Image.findByPk(imageId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (image) {
        reponse.status(200).json(image);
    }
    else {
        reponse.status(400).json("an error has occured");
    }
});
exports.imageRouter.post("/", async (request, reponse) => {
    const imageBody = request.body;
    const image = await Image.create({
        url: imageBody.url,
        description: imageBody.url,
        auteur: imageBody.auteur
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(image);
});
exports.imageRouter.post("/user", async (request, reponse) => {
    const body = request.body;
    const user = await User.findByPk(body.userId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const image = await Image.findByPk(body.imageId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    await image.addUser(user)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("image has been add to user");
});
exports.imageRouter.get("/:userId", async (request, reponse) => {
    const userId = request.params.userId;
    const user = await User.findByPk(userId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const image = await user.getImages
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (image) {
        reponse.status(200).json(image);
    }
    else {
        reponse.status(404).json("no image");
    }
});
exports.imageRouter.post("/item", async (request, reponse) => {
    const body = request.body;
    const item = await Item.findByPk(body.itemId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const image = await Image.findByPk(body.imageId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    await image.addItem(item)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("image has been add to item");
});
exports.imageRouter.get("/item/:itemId", async (request, reponse) => {
    const itemId = request.params.itemId;
    const item = await Item.findByPk(itemId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const image = await item.getImages()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (image) {
        reponse.status(200).json(image);
    }
    else {
        reponse.status(400).json("no image");
    }
});
exports.imageRouter.post("/collection", async (request, reponse) => {
    const body = request.body;
    const collection = await Collection.findByPk(body.collectionId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const image = await Image.findByPk(body.imageId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    await image.addCollection(collection)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("image has been add to collection");
});
exports.imageRouter.get("/collection/:collectionId", async (request, reponse) => {
    const collectionId = request.params.collectionId;
    const collection = await Collection.findByPk(collectionId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const image = await Image.findByPk(collection.ImageId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (image) {
        reponse.status(200).json(image);
    }
    else {
        reponse.status(400).json("no image");
    }
});
