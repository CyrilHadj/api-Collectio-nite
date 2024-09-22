"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.achievementRouter = void 0;
const express = require("express");
exports.achievementRouter = express.Router();
const Achievement = require("../databases/Achievement");
exports.achievementRouter.get("/all", async (request, reponse) => {
    const achievements = await Achievement.findAll()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (achievements) {
        reponse.status(200).json(achievements);
    }
    else {
        reponse.status(400).json("cannot get all Achievements");
    }
    ;
});
exports.achievementRouter.get("/:id", async (request, reponse) => {
    const achievement = await Achievement.findByPk(request.params.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (achievement) {
        reponse.status(200).json(achievement);
    }
    else {
        reponse.status(404).json("cannot find Achievement");
    }
});
exports.achievementRouter.post("/", async (request, reponse) => {
    const body = request.body;
    const achievement = await Achievement.create({
        name: body.name,
        description: body.description
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(achievement);
});
exports.achievementRouter.delete("/:id", async (request, reponse) => {
    const id = request.params.id;
    Achievement.destroy({
        where: {
            id: id
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("Achievement has been deleted");
});
exports.achievementRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const achievement = await Achievement.findByPk(modification.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    achievement.name = modification.name;
    achievement.description = modification.description;
    if (achievement) {
        await achievement.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("achievement has been modified");
    }
    else {
        reponse.status(404).json("an error has occured");
    }
});
