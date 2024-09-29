import { json, Op } from "sequelize";

const express = require("express");

export const communauteRouter = express.Router();
const checkJwt = require("../middleware/checkjwt")
const Communaute = require("../databases/Communaute");


communauteRouter.get("/all",checkJwt(1),async (request, reponse)=>{

    const communaute = await Communaute.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(Communaute){
        reponse.status(200).json(Communaute);
    }else{
        reponse.status(400).json("cannot get all Communaute")
    };
});

communauteRouter.get("/:id",checkJwt(1), async (request,reponse)=>{

    const communaute = await  Communaute.findByPk(request.params.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(communaute){
        reponse.status(200).json(Communaute)
    }else{
        reponse.status(404).json("cannot find Communaute")
    }
});

communauteRouter.post("/",checkJwt(1), async (request,reponse)=>{

    const body = request.body;

    const communaute = await Communaute.create({
        name : body.name,
        theme : body.theme,
        description : body.description
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json(communaute);
});

communauteRouter.delete("/:id",checkJwt(1), async (request,reponse)=>{
    const id = request.params.id;

    Communaute.destroy({
        where : {
            id : id
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    reponse.status(200).json("Communaute has been deleted")
});


communauteRouter.put("/",checkJwt(1),async (request,reponse)=>{
    const modification = request.body;

    const communaute = await Communaute.findByPk(modification.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    communaute.name = modification.name
    communaute.description = modification.description
    communaute.theme = modification.theme

    if(communaute){
        await communaute.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        reponse.status(200).json("Communaute has been modified");
    }else{
        reponse.status(404).json("an error has occured")
    }

});