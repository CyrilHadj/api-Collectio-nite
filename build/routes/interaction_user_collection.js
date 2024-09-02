"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interaction_collectionRouter = void 0;
const express = require("express");
exports.interaction_collectionRouter = express.Router();
const Interaction_collection = require("../databases/Interaction_user_collection");
exports.interaction_collectionRouter.post("/", async (request, reponse) => {
    const body = request.body;
    const interaction = await Interaction_collection.create({
        like: body.like,
        dislike: body.dislike,
        post: body.post
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(interaction);
});
