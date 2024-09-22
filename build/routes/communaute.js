"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communauteRouter = void 0;
const express = require("express");
exports.communauteRouter = express.Router();
const Communaute = require("../databases/Communaute");
exports.communauteRouter.get("/all", async (request, reponse) => {
    const communaute = await Communaute.findAll()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (Communaute) {
        reponse.status(200).json(Communaute);
    }
    else {
        reponse.status(400).json("cannot get all Communaute");
    }
    ;
});
exports.communauteRouter.get("/:id", async (request, reponse) => {
    const communaute = await Communaute.findByPk(request.params.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (communaute) {
        reponse.status(200).json(Communaute);
    }
    else {
        reponse.status(404).json("cannot find Communaute");
    }
});
exports.communauteRouter.post("/", async (request, reponse) => {
    const body = request.body;
    const communaute = await Communaute.create({
        name: body.name,
        theme: body.theme,
        description: body.description
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(communaute);
});
exports.communauteRouter.delete("/:id", async (request, reponse) => {
    const id = request.params.id;
    Communaute.destroy({
        where: {
            id: id
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("Communaute has been deleted");
});
exports.communauteRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const communaute = await Communaute.findByPk(modification.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    communaute.name = modification.name;
    communaute.description = modification.description;
    communaute.theme = modification.theme;
    if (communaute) {
        await communaute.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("Communaute has been modified");
    }
    else {
        reponse.status(404).json("an error has occured");
    }
});
