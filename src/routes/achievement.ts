import { json, Op } from "sequelize";

const express = require("express");

export const achievementRouter = express.Router();
const checkJwt = require("../middleware/checkjwt")
const Achievement = require("../databases/Achievement");


achievementRouter.get("/all",checkJwt(1),async (request, reponse)=>{

    const achievements = await Achievement.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(achievements){
        reponse.status(200).json(achievements);
    }else{
        reponse.status(400).json("cannot get all Achievements")
    };
});

achievementRouter.get("/:id",checkJwt(1), async (request,reponse)=>{

    const achievement = await  Achievement.findByPk(request.params.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(achievement){
        reponse.status(200).json(achievement)
    }else{
        reponse.status(404).json("cannot find Achievement")
    }
});

achievementRouter.post("/",checkJwt(1), async (request,reponse)=>{

    const body = request.body;

    const achievement = await Achievement.create({
        name : body.name,
        description : body.description
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json(achievement);
});

achievementRouter.delete("/:id",checkJwt(1), async (request,reponse)=>{
    const id = request.params.id;

    Achievement.destroy({
        where : {
            id : id
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    reponse.status(200).json("Achievement has been deleted")
});


achievementRouter.put("/",checkJwt(1),async (request,reponse)=>{
    const modification = request.body;

    const achievement = await Achievement.findByPk(modification.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    achievement.name = modification.name
    achievement.description = modification.description
    if(achievement){
        await achievement.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        reponse.status(200).json("achievement has been modified");
    }else{
        reponse.status(404).json("an error has occured")
    }

});