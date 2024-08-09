import { json, Op } from "sequelize";

const express = require("express");

export const itemRouter = express.Router();
const Item = require("../databases/Item");
const Collection = require("../databases/Collection");
const Category = require("../databases/Category");

//Item
//POST collection item
itemRouter.post("/collection/:collectionID", async (request, reponse) => {
    const body = request.body;
    
    const collection = await Collection.findByPk(request.params.collectionID)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    const item = await Item.create(body)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    await item.addCollection(collection)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(collection){
        reponse.status(200).json("Item has been add to collection");
    }else{
        reponse.status(404).json("collection not found");
    }
});

//GET Item by collection
itemRouter.get("/all/collection/:collectionId", async (request, reponse) => {
    const collectionId = request.params.collectionId;
    
    const collection = await Collection.findByPk(collectionId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    const items = await collection.getItems()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    
    if(collection){
        reponse.status(200).json(items);
    }else{
        reponse.status(404).json("collection not found");
    }
});

//GET Items
itemRouter.get("/all", async (request,reponse)=>{
    const items = await Item.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    if(items){
        reponse.status(200).json(items)
    }else{
        reponse.status(404).json("Items not found");
    }
});

//GET Item by id
itemRouter.get("/:id",async (request,reponse)=>{
    const itemId = request.params.id;

    const item = await Item.findByPk(itemId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(item){
        reponse.status(200).json(item)
    }else{
        reponse.status(404).json("Item not found");
    }
});

//DELETE Item
itemRouter.delete("/:id", async (request, reponse)=>{
    const itemId = request.params.id;

    await Item.destroy({
        where : {
            id : itemId
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("Item has been deleted")
});

//POST item 
itemRouter.post("/",async (request,reponse)=>{
    const itemBody = request.body;

    const item = await Item.create({
        name : itemBody.name
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json(item)
});

//UPDATE Item
itemRouter.put("/",async (request,reponse)=>{
    const modification = request.body;

    const item = await Item.findByPk(modification.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    
    item.name = modification.name;

    if(item){
        await item.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });

        reponse.status(200).json("item has been modified")
    }else{
        reponse.status(404).json("item not found")
    }

});

//Post Item Category
itemRouter.post("/category", async (request,reponse)=>{
    const body = request.body;
   

    const item = await Item.findByPk(body.itemId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    
    const category = await Category.findByPk(body.CategoryId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    
    if(item && category){
        item.addCategory(category);
        reponse.status(200).json("category has been had");
    }else{
        reponse.status(404).json("Cannot post item category")
    }
});

//GET Item by category
itemRouter.get("/category/:categoryId", async (request , reponse)=>{
    const categoryId = request.params.categoryId;

    const category = await Category.findByPk(categoryId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    

    const item = await category.getItems()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    
    if(item){
        reponse.status(200).json(item)
    }else{
        reponse.status(404).json("cannot find item")
    }
});

