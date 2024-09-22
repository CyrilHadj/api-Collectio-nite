"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caracteristiqueRouter = void 0;
const express = require("express");
exports.caracteristiqueRouter = express.Router();
const Caracteristique = require("../databases/Caracteristique");
const Model = require("../databases/Model");
// get content by model
exports.caracteristiqueRouter.get("/all/model/:modelId", async (request, reponse) => {
    const modelId = request.params.modelId;
    const model = await Model.findByPk(modelId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const caracteristique = await model.getCaracteristiques()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (model) {
        reponse.status(200).json(caracteristique);
    }
    else {
        reponse.status(404).json("collection not found");
    }
});
//post caracteristique to model
exports.caracteristiqueRouter.post("/model", async (request, reponse) => {
    const body = request.body;
    try {
        console.log(body);
        const model = await Model.findByPk(body.modelId);
        if (!model) {
            return reponse.status(404).json("Model not found");
        }
        const caracteristique = await Caracteristique.create({
            title: body.title,
            subtitle: body.subtitle
        });
        await caracteristique.addModel(model.id);
        reponse.status(200).json(model);
    }
    catch (error) {
        console.error("An error occurred:", error);
        return reponse.status(500).json("An error has occurred");
    }
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
    console.log(modification);
    caracteristique.title = modification.title;
    caracteristique.subtitle = modification.subtitle;
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
