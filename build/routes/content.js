"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRouter = void 0;
const express = require("express");
exports.contentRouter = express.Router();
const Content = require("../databases/Content");
const Model = require("../databases/Model");
// post content to model
exports.contentRouter.post("/model", async (request, reponse) => {
    const body = request.body;
    try {
        const model = await Model.findByPk(body.modelId);
        if (!model) {
            return reponse.status(404).json("Model not found");
        }
        const content = await Content.create({
            title: body.title,
            text: body.text
        });
        await content.addModel(model.id);
        reponse.status(200).json(model);
    }
    catch (error) {
        console.error("An error occurred:", error);
        return reponse.status(500).json("An error has occurred");
    }
});
// get content by model
exports.contentRouter.get("/all/model/:modelId", async (request, reponse) => {
    const modelId = request.params.modelId;
    const model = await Model.findByPk(modelId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const content = await model.getContents()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (model) {
        reponse.status(200).json(content);
    }
    else {
        reponse.status(404).json("collection not found");
    }
});
//update
exports.contentRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const content = await Content.findByPk(modification.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    content.title = modification.title;
    content.text = modification.text;
    if (content) {
        await content.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("task has been modified");
    }
    else {
        reponse.status(404).json("an error has occured");
    }
});
exports.contentRouter.delete("/:id", async (request, reponse) => {
    const id = request.params.id;
    Content.destroy({
        where: {
            id: id
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("model has been deleted");
});
