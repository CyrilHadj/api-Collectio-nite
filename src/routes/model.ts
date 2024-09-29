import { json, Op } from "sequelize";

const express = require("express");

export const modelRouter = express.Router();
const checkJwt = require("../middleware/checkjwt")
const Model = require("../databases/Model");
const Item = require("../databases/Item");
const Caracteristique = require("../databases/Caracteristique");
const Image = require("../databases/Image");


modelRouter.get("/all",checkJwt(1),async (request, reponse)=>{

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

modelRouter.get("/:id",checkJwt(1), async (request,reponse)=>{

    const model = await  Model.findByPk(request.params.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(model){
        reponse.status(200).json(model)
    }else{
        reponse.status(404).json("cannot find model")
    }
});

modelRouter.post("/",checkJwt(1), async (request,reponse)=>{

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

modelRouter.delete("/:id",checkJwt(1), async (request,reponse)=>{
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


modelRouter.put("/",checkJwt(1),async (request,reponse)=>{
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

// post model to item
modelRouter.post("/item",checkJwt(1), async (request, reponse) => {
    const body = request.body;
    try{
    const item = await Item.findByPk(body.itemId)
    .catch(error=>{
        console.log(error)
        return reponse.status(500).json("an error has occured")
    });

    if (!item) {
        return reponse.status(404).json("Item not found");
    }

    const model = await Model.create({
        name : body.name,
    })
    .catch(error=>{
        console.log(error)
        return reponse.status(500).json("an error has occured while creating the model")
    });
   
    if(model.name == "content"){
        const caracteristique = await Caracteristique.create({
            title : "Titre",
            subtitle :"Sous-titre"
        })
        await model.addCaracteristiques(caracteristique)
    };

    await item.addModel(model.id)
    .catch(error=>{
        console.log(error)
        return reponse.status(500).json("an error has occured")
    });
        reponse.status(200).json(model);
    }
    catch(error){
        return reponse.status(500).json("An error has occurred");
    }
  
});

modelRouter.get("/item/:itemId",checkJwt(1), async (request,reponse)=>{

    const item = await Item.findByPk(request.params.itemId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    
    const models = await item.getModels()

    if(models){
        reponse.status(200).json(models)
    }else{
        reponse.status(404).json("cannot find model")
    }
});


modelRouter.get("/images/:modelId",checkJwt(1), async (request,reponse)=>{
    const modelId = request.params.modelId;

    const model = await Model.findByPk(modelId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    const image = await model.getImages()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    if(image){
        reponse.status(200).json(image);
    }else{
        reponse.status(404).json("no image")
    }
});

modelRouter.post("/image",checkJwt(1), async (request, reponse) => {
    const body = request.body;
    try{
    const model = await Model.findByPk(body.modelId)

    if (!model) {
        return reponse.status(404).json("Model not found");
    }

    const image = await Image.create({
       url : body.url
    })

    await image.addModel(model.id)

        reponse.status(200).json(model);
    }
    catch(error){
        return reponse.status(500).json("An error has occurred");
    }
  
});