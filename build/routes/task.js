"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express = require("express");
exports.taskRouter = express.Router();
const Task = require("../databases/Task");
const Model = require("../databases/Model");
exports.taskRouter.get("/all", async (request, reponse) => {
    const task = await Task.findAll()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (task) {
        reponse.status(200).json(task);
    }
    else {
        reponse.status(400).json("cannot get all caracteristique");
    }
    ;
});
exports.taskRouter.get("/:id", async (request, reponse) => {
    const task = await Task.findByPk(request.params.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (task) {
        reponse.status(200).json(Task);
    }
    else {
        reponse.status(404).json("cannot find caracteristique");
    }
});
// post task to model
exports.taskRouter.post("/model", async (request, reponse) => {
    const body = request.body;
    try {
        const model = await Model.findByPk(body.modelId);
        if (!model) {
            return reponse.status(404).json("Model not found");
        }
        const task = await Task.create({
            title: body.title,
            completed: body.completed
        });
        await task.addModel(model.id);
        reponse.status(200).json(model);
    }
    catch (error) {
        return reponse.status(500).json("An error has occurred");
    }
});
// get task by model
exports.taskRouter.get("/all/model/:modelId", async (request, reponse) => {
    const modelId = request.params.modelId;
    const model = await Model.findByPk(modelId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const task = await model.getTasks()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (model) {
        reponse.status(200).json(task);
    }
    else {
        reponse.status(404).json("collection not found");
    }
});
exports.taskRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const task = await Task.findByPk(modification.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    task.title = modification.title;
    task.completed = modification.completed;
    if (task) {
        await task.save()
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
exports.taskRouter.delete("/:id", async (request, reponse) => {
    const id = request.params.id;
    Task.destroy({
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
