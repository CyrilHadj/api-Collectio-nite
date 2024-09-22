"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interaction_itemRouter = void 0;
const express = require("express");
exports.interaction_itemRouter = express.Router();
const Interaction_item = require("../databases/Interaction_user_item");
exports.interaction_itemRouter.post("/", async (request, reponse) => {
    const body = request.body;
    const interaction = await Interaction_item.create({
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
