import { json, Op } from "sequelize";

const express = require("express");

export const caracteristiqueRouter = express.Router();

const Caracteristique = require("../databases/Caracteristique");


caracteristiqueRouter.get("/all",async (request, reponse)=>{

    const caracteristique = await Caracteristique.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(caracteristique){
        reponse.status(200).json(caracteristique);
    }else{
        reponse.status(400).json("cannot get all caracteristique")
    };
});

caracteristiqueRouter.get("/:id", async (request,reponse)=>{

    const caracteristique = await  Caracteristique.findByPk(request.params.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(caracteristique){
        reponse.status(200).json(caracteristique)
    }else{
        reponse.status(404).json("cannot find caracteristique")
    }
});

caracteristiqueRouter.post("/", async (request,reponse)=>{

    const body = request.body;

    const caracteristique = await Caracteristique.create({
        name : body.name
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json(caracteristique);
});

caracteristiqueRouter.delete("/:id", async (request,reponse)=>{
    const id = request.params.id;

    Caracteristique.destroy({
        where : {
            id : id
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    reponse.status(200).json("caracteristique has been deleted")
});


caracteristiqueRouter.put("/",async (request,reponse)=>{
    const modification = request.body;

    const caracteristique = await Caracteristique.findByPk(modification.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    caracteristique.name = modification.name

    if(caracteristique){
        await caracteristique.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        reponse.status(200).json("caracteristique has been modified");
    }else{
        reponse.status(404).json("an error has occured")
    }

});