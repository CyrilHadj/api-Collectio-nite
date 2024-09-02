"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interaction_caracteristiqueRouter = void 0;
const express = require("express");
exports.interaction_caracteristiqueRouter = express.Router();
const Interaction_caracteristique = require("../databases/Interaction_user_caracteristique");
exports.interaction_caracteristiqueRouter.post("/", async (request, reponse) => {
    const body = request.body;
    const interaction = await Interaction_caracteristique.create({
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
