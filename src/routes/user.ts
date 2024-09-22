import { json, Op } from "sequelize";

const express = require("express");
const bcrypt = require("bcrypt")
export const userRouter = express.Router();

const User = require("../databases/User");
const interactCaracteristique = require("../databases/Interaction_user_caracteristique");
const interactCollection = require("../databases/Interaction_user_collection");
const interactItem = require("../databases/Interaction_user_item");
const interactCommunaute = require("../databases/Interaction_user_communaute");

//Crud User

userRouter.get("/all",async (request,reponse)=>{

    const users = await User.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(users){
        reponse.status(200).json(users);
    }else{
        reponse.status(404).json("cannot find users")
    }
});



userRouter.get("/:id",async (request,reponse)=>{

    const user = await User.findByPk(request.params.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(user){
        reponse.status(200).json(user);
    }else{
        reponse.status(404).json("cannot find user");
    }
});

userRouter.post("/signup", async (request,reponse)=>{
    const signUpForm = request.body;

    const user = await User.create({
        name : signUpForm.name,
        email : signUpForm.email,
        password : signUpForm.password
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json(user);
});


userRouter.post("/signin", async (request,reponse)=>{
    const signInForm = request.body;

    const user = await User.findOne({
        where : {
            email : signInForm.email
        }
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    const isPasswordValid = await bcrypt.compare(signInForm.password, user.password)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    if(isPasswordValid){
        return reponse.status(200).json("connected");
    }else{
        reponse.status(401).json("Identifiant invalid")
    }
});



userRouter.put("/", async (request,reponse)=>{
    const modification = request.body;

    const user = await User.findByPk(modification.id)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    user.email = modification.email;
    user.name = modification.name;
    user.password = modification.password;
    
    if(user){
        await user.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        
        reponse.status(200).json("User has been modified")
    }else{
        reponse.status(404).json("cannot find user")
    }
});

//Interaction

//caracteristique
userRouter.post("/interaction/caracteristique" , async (request,reponse)=>{

    const post = request.body;

    const interactionItem = interactCaracteristique.create({
        like : post.like,
        dislike : post.dislike,
        post : post.post,
        UserId : post.UserId,
        CaracteristiqueId : post.CaracteristiqueId
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("Interaction has been had");
})

userRouter.put("/interaction/caracteristique", async (request,reponse)=>{
    const modification = request.body

    const post = await interactCaracteristique.findByPk(modification.postId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    post.like = modification.like
    post.dislike = modification.dislike
    post.post = modification.post

    if(post){
        await post.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        
        reponse.status(200).json("Post has been modified")
    }else{
        reponse.status(404).json("cannot find post")
    }

})

userRouter.delete("/interaction/caracteristique/:id", async (request,reponse)=>{
    const postId = request.params.id;

    interactCaracteristique.destroy({
        where :{
            id : postId
        }
    }).catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("Post has been deleted")

});

//collection
userRouter.post("/interaction/collection" , async (request,reponse)=>{

    const post = request.body;

    const interactionCollection = interactCollection.create({
        like : post.like,
        dislike : post.dislike,
        post : post.post,
        UserId : post.UserId,
        CollectionId : post.CollectionId
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("Interaction has been had");
})

userRouter.put("/interaction/collection/:id", async (request,reponse)=>{
    const modification = request.body

    const post = await interactCollection.findByPk(modification.postId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    post.like = modification.like
    post.dislike = modification.dislike
    post.post = modification.post

    if(post){
        await post.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        
        reponse.status(200).json("Post has been modified")
    }else{
        reponse.status(404).json("cannot find post")
    }

});

userRouter.delete("/interaction/collection/:id", async (request,reponse)=>{
    const postId = request.params.id;

    interactCollection.destroy({
        where :{
            id : postId
        }
    }).catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("Post has been deleted")

});

//item
userRouter.post("/interaction/item" , async (request,reponse)=>{

    const post = request.body;

    const interactionItem = interactItem.create({
        like : post.like,
        dislike : post.dislike,
        post : post.post,
        UserId : post.UserId,
        ItemId : post.ItemId
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("Interaction has been had");
});

userRouter.put("/interaction/item/:id", async (request,reponse)=>{
    const modification = request.body

    const post = await interactItem.findByPk(modification.postId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    post.like = modification.like
    post.dislike = modification.dislike
    post.post = modification.post

    if(post){
        await post.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        
        reponse.status(200).json("Post has been modified")
    }else{
        reponse.status(404).json("cannot find post")
    }

});

userRouter.delete("/interaction/item/:id", async (request,reponse)=>{
    const postId = request.params.id;

    interactItem.destroy({
        where :{
            id : postId
        }
    }).catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("Post has been deleted")

});

//communauté

userRouter.post("/interaction/communaute" , async (request,reponse)=>{

    const post = request.body;

    const interactionCommunaute = interactCommunaute.create({
        like : post.like,
        dislike : post.dislike,
        post : post.post,
        UserId : post.UserId,
        CommunauteId : post.CommunauteId
    })
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("Interaction has been had");
});

userRouter.put("/interaction/communaute/:id", async (request,reponse)=>{
    const modification = request.body

    const post = await interactCommunaute.findByPk(modification.postId)
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    post.like = modification.like
    post.dislike = modification.dislike
    post.post = modification.post

    if(post){
        await post.save()
        .catch(error=>{
            console.log(error)
            reponse.status(500).json("an error has occured")
        });
        
        reponse.status(200).json("Post has been modified")
    }else{
        reponse.status(404).json("cannot find post")
    }

});

userRouter.delete("/interaction/communaute/:id", async (request,reponse)=>{
    const postId = request.params.id;

    interactCommunaute.destroy({
        where :{
            id : postId
        }
    }).catch(error=>{
        console.log(error)
        reponse.status(500).json("an error has occured")
    });

    reponse.status(200).json("Post has been deleted")

});