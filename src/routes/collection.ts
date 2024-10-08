import { DataTypes, json, Op } from "sequelize";

const express = require("express");
const checkJwt = require("../middleware/checkjwt")
export const collectionRouter = express.Router();
const Collection = require("../databases/Collection");
const User = require("../databases/User");


collectionRouter.get("/all",checkJwt(1), async (request, reponse)=>{

    const collections = await Collection.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(collections){
        reponse.status(200).json(collections);
    }else{
        reponse.status(400).json("an error has occured")
    }
});


collectionRouter.get("/:id",checkJwt(1), async (request,reponse)=>{

    const collection = await Collection.findByPk(request.params.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(collection){
        reponse.status(200).json(collection)
    }else{
        reponse.status(400).json("an error has occured")
    }
});


collectionRouter.get("/search/:input",checkJwt(1), async (request,reponse)=>{
    const search = request.params.input;
   
    const collection = await Collection.findAll({
        where : {
            name : {[Op.like]: "%"+search+"%"}
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(collection){
        reponse.status(200).json(collection);
    }else{
        reponse.status(400).json("an error has occured")
    }
});



collectionRouter.get("/category/:categoryId" ,checkJwt(1), async (request,reponse)=>{
    const categoryId = request.params.categoryId;
    const collection = await Collection.findAll({
        where : {
            CategoryId : categoryId
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(collection){
        reponse.status(200).json(collection);
    }else{
        reponse.status(400).json("an error has occured")
    }
})

collectionRouter.post("/user",checkJwt(1), async (request,reponse)=>{
    const body = request.body;
    console.log(body)
    try{
        const user = await User.findByPk(request.body.userId)
        
        const collection = await Collection.create({
            name : body.name,
            description : body.description
        })

        await user.addCollection(collection)

        reponse.status(200).json(collection)

    }catch(error){
        console.log(error);
        return reponse.status(500).json({ error: "An error has occurred" });
    }
})

collectionRouter.get("/user/:userId",checkJwt(1), async (request,reponse)=>{
    const body = request.body;
    try{
        const user = await User.findByPk(request.params.userId)

        const collection = await user.getCollections()

        reponse.status(200).json(collection)

    }catch(error){
        console.log(error);
        return reponse.status(500).json({ error: "An error has occurred" });
    }
})



collectionRouter.post("/",checkJwt(1), async (request,reponse)=>{
    const bodyCollection =  request.body ;
  
    const collection = await Collection.create({
        name : bodyCollection.name,
        description : bodyCollection.description
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json(collection)
});



collectionRouter.delete("/:id",checkJwt(1), async (request,reponse)=>{
    const collectionId = request.params.id;

    await Collection.destroy({
        where : {
            id : collectionId
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("collection has been deleted");
})


collectionRouter.put("/",checkJwt(1), async (request,reponse)=>{
    const modification = request.body;

    const collection = await Collection.findByPk(modification.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    collection.name = modification.name;
    collection.description = modification.description;
    if(collection){
        await collection.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        reponse.status(200).json({
            message : "product has been modified",
            data : collection
        })
    }else{
        reponse.status(400).json("an error has occured")
    }
})
