"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interaction_communautéRouter = void 0;
const express = require("express");
exports.interaction_communautéRouter = express.Router();
const Interaction_communauté = require("../databases/Interaction_user_communauté");
exports.interaction_communautéRouter.post("/", async (request, reponse) => {
    const body = request.body;
    const interaction = await Interaction_communauté.create({
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
