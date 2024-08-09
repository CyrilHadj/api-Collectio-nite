import { json, Op } from "sequelize";

const express = require("express");

export const categoryRouter = express.Router();

const Category = require("../databases/Category");


categoryRouter.get("/all",async (request, reponse)=>{

    const categories = await Category.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(categories){
        reponse.status(200).json(categories);
    }else{
        reponse.status(400).json("cannot get all categories")
    };
});



categoryRouter.get("/:id", async (request,reponse)=>{

    const category = await Category.findByPk(request.params.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(category){
        reponse.status(200).json(category)
    }else{
        reponse.status(404).json("cannot find category")
    }
});



categoryRouter.get("/search/:input", async (request,reponse)=>{

    const search = request.params.input;

    const category = await Category.findAll({
        where : {
            name : {[Op.like] : "%"+search+"%"}
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(category){
        reponse.status(200).json(category)
    }else{
        reponse.status(404).json("cannot find category")
    }
});



categoryRouter.post("/", async (request,reponse)=>{

    const bodyCategory = request.body;

    const category = await Category.create({
        name : bodyCategory.name
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json(category);
});


categoryRouter.delete("/:id", async (request,reponse)=>{
    const categoryId = request.params.id;
    Category.destroy({
        where : {
            id : categoryId
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    reponse.status(200).json("Category has been deleted")
});


categoryRouter.put("/",async (request,reponse)=>{
    const modification = request.body;

    const category = await Category.findByPk(modification.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    console.log(category)

    category.name = modification.name
    if(category){
        await category.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        reponse.status(200).json("Category :" + category + "has been modified");
    }else{
        reponse.status(404).json("an error has occured")
    }

});