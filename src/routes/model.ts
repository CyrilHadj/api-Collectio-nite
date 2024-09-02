import { json, Op } from "sequelize";

const express = require("express");

export const modelRouter = express.Router();

const Model = require("../databases/Model");


modelRouter.get("/all",async (request, reponse)=>{

    const model = await Model.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(Model){
        reponse.status(200).json(Model);
    }else{
        reponse.status(400).json("cannot get all model")
    };
});

modelRouter.get("/:id", async (request,reponse)=>{

    const model = await  Model.findByPk(request.params.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(model){
        reponse.status(200).json(Model)
    }else{
        reponse.status(404).json("cannot find model")
    }
});

modelRouter.post("/", async (request,reponse)=>{

    const body = request.body;

    const model = await Model.create({
        name : body.name,
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json(model);
});

modelRouter.delete("/:id", async (request,reponse)=>{
    const id = request.params.id;

    Model.destroy({
        where : {
            id : id
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    reponse.status(200).json("model has been deleted")
});


modelRouter.put("/",async (request,reponse)=>{
    const modification = request.body;

    const model = await Model.findByPk(modification.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    model.name = modification.name
  

    if(model){
        await model.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        reponse.status(200).json("model has been modified");
    }else{
        reponse.status(404).json("an error has occured")
    }

});