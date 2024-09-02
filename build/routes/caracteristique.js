"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caracteristiqueRouter = void 0;
const express = require("express");
exports.caracteristiqueRouter = express.Router();
const Caracteristique = require("../databases/Caracteristique");
exports.caracteristiqueRouter.get("/all", async (request, reponse) => {
    const caracteristique = await Caracteristique.findAll()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (caracteristique) {
        reponse.status(200).json(caracteristique);
    }
    else {
        reponse.status(400).json("cannot get all caracteristique");
    }
    ;
});
exports.caracteristiqueRouter.get("/:id", async (request, reponse) => {
    const caracteristique = await Caracteristique.findByPk(request.params.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (caracteristique) {
        reponse.status(200).json(caracteristique);
    }
    else {
        reponse.status(404).json("cannot find caracteristique");
    }
});
exports.caracteristiqueRouter.post("/", async (request, reponse) => {
    const body = request.body;
    const caracteristique = await Caracteristique.create({
        name: body.name
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(caracteristique);
});
exports.caracteristiqueRouter.delete("/:id", async (request, reponse) => {
    const id = request.params.id;
    Caracteristique.destroy({
        where: {
            id: id
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("caracteristique has been deleted");
});
exports.caracteristiqueRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const caracteristique = await Caracteristique.findByPk(modification.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    caracteristique.name = modification.name;
    if (caracteristique) {
        await caracteristique.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("caracteristique has been modified");
    }
    else {
        reponse.status(404).json("an error has occured");
    }
});
