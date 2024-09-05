"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = require("express");
const bcrypt = require("bcrypt");
exports.userRouter = express.Router();
const User = require("../databases/User");
const interactCaracteristique = require("../databases/Interaction_user_caracteristique");
const interactCollection = require("../databases/Interaction_user_collection");
const interactItem = require("../databases/Interaction_user_item");
const interactCommunaute = require("../databases/Interaction_user_communaute");
//Crud User
exports.userRouter.get("/all", async (request, reponse) => {
    const users = await User.findAll()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (users) {
        reponse.status(200).json(users);
    }
    else {
        reponse.status(404).json("cannot find users");
    }
});
exports.userRouter.get("/:id", async (request, reponse) => {
    const user = await User.findByPk(request.params.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (user) {
        reponse.status(200).json(user);
    }
    else {
        reponse.status(404).json("cannot find user");
    }
});
exports.userRouter.post("/signup", async (request, reponse) => {
    const signUpForm = request.body;
    const user = await User.create({
        name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(user);
});
exports.userRouter.post("/signin", async (request, reponse) => {
    const signInForm = request.body;
    const user = await User.findOne({
        where: {
            email: signInForm.email
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const isPasswordValid = await bcrypt.compare(signInForm.password, user.password)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (isPasswordValid) {
        return reponse.status(200).json("connected");
    }
    else {
        reponse.status(401).json("Identifiant invalid");
    }
});
exports.userRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const user = await User.findByPk(modification.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    user.email = modification.email;
    user.name = modification.name;
    user.password = modification.password;
    if (user) {
        await user.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("User has been modified");
    }
    else {
        reponse.status(404).json("cannot find user");
    }
});
//Interaction
exports.userRouter.post("/interaction/caracteristique", async (request, reponse) => {
    const post = request.body;
    const interactionItem = interactItem.create({
        like: post.like,
        dislike: post.dislike,
        post: post.post,
        UserId: post.UserId,
        CaracteristiqueId: post.CaracteristiqueId
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(interactionItem);
});
exports.userRouter.post("/interaction/collection", async (request, reponse) => {
    const post = request.body;
    const interactionCollection = interactCollection.create({
        like: post.like,
        dislike: post.dislike,
        post: post.post,
        UserId: post.UserId,
        CollectionId: post.CollectionId
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(interactionCollection);
});
exports.userRouter.post("/interaction/item", async (request, reponse) => {
    const post = request.body;
    const interactionItem = interactItem.create({
        like: post.like,
        dislike: post.dislike,
        post: post.post,
        UserId: post.UserId,
        ItemId: post.ItemId
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(interactionItem);
});
exports.userRouter.post("/interaction/communaute", async (request, reponse) => {
    const post = request.body;
    const interactionCommunaute = interactCommunaute.create({
        like: post.like,
        dislike: post.dislike,
        post: post.post,
        UserId: post.UserId,
        CommunauteId: post.CommunauteId
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(interactionCommunaute);
});
