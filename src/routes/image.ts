import { json, Op } from "sequelize";

const express = require("express");

export const imageRouter = express.Router();
const checkJwt = require("../middleware/checkjwt")
const Item = require("../databases/Item");
const Collection = require("../databases/Collection");
const Image = require("../databases/Image");
const User = require("../databases/User");



imageRouter.get("/:id",checkJwt(1), async (request,reponse)=>{
    const imageId = request.params.id;

    const image = await Image.findByPk(imageId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(image){
        reponse.status(200).json(image);
    }else{
        reponse.status(400).json("an error has occured");
    }
});


imageRouter.post("/",checkJwt(1), async (request,reponse)=>{
    const imageBody = request.body;

    const image = await Image.create({
        url : imageBody.url,
        description : imageBody.url,
        auteur : imageBody.auteur
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json(image)
});


imageRouter.post("/user",checkJwt(1), async (request,reponse)=>{
    const body = request.body;
 
    const user = await User.findByPk(body.userId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    const image = await Image.findByPk(body.imageId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    await image.addUser(user)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("image has been add to user")
});


imageRouter.put("/item",checkJwt(1), async (request, response) => {
    const { itemId, imageId, url } = request.body;
  
    try {

      const item = await Item.findByPk(itemId);
      const image = await Image.findByPk(imageId);
  
      if (!item || !image) {
        return response.status(404).json({ error: "Item or Image not found" });
      }
  
      
      const isAssociated = await item.hasImage(image);
      if (!isAssociated) {
        return response.status(400).json({ error: "Image is not associated with this item" });
      }
  

      await image.update({ url });
  
      return response.status(200).json({ message: "Image updated successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "An error occurred" });
    }
  });

imageRouter.get("/:userId",checkJwt(1), async (request,reponse)=>{
    const userId = request.params.userId;

    const user = await User.findByPk(userId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    const image = await user.getImages
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


imageRouter.post("/item",checkJwt(1), async (request, reponse) => {
    const body = request.body;

    const item = await Item.findByPk(body.itemId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    const image = await Image.create({
        url : body.url,
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    
    await image.addItem(item)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("image has been add to item");
});


imageRouter.get("/item/:itemId",checkJwt(1), async (request, reponse) => {
    const itemId = request.params.itemId;
    
    const item = await Item.findByPk(itemId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    const image = await item.getImages()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    if(image){
        reponse.status(200).json(image);
    }else{
        reponse.status(400).json("no image")
    }
});


imageRouter.post("/collection",checkJwt(1), async (request, reponse) => {
    const body = request.body;

    const collection = await Collection.findByPk(body.collectionId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    const image = await Image.create({
        url : body.url,
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    await image.addCollection(collection)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    reponse.status(200).json("image has been add to collection");
});


imageRouter.get("/collection/:collectionId",checkJwt(1), async (request, reponse) => {
    const collectionId = request.params.collectionId;
    
    const collection = await Collection.findByPk(collectionId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
  
    const image = await Image.findByPk(collection.ImageId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });
    if(image){
        reponse.status(200).json(image);
    }else{
        reponse.status(400).json("no image")
    }   
});

imageRouter.delete("/:id",checkJwt(1), async (request,reponse)=>{
    const imageId = request.params.id

    Image.destroy({
        where : {id : imageId}
    })
    .catch(error=>{
        console.log(error)
    })

    reponse.status(200).json("Image has been deleted");
})
