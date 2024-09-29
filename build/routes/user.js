"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = require("express");
const bcrypt = require("bcrypt");
exports.userRouter = express.Router();
const { readFile } = require('node:fs/promises');
const jwt = require("jsonwebtoken");
const checkJwt = require("../middleware/checkjwt");
const User = require("../databases/User");
const Role = require("../databases/Role");
const Image = require("../databases/Image");
const Category = require("../databases/Category");
const interactCaracteristique = require("../databases/Interaction_user_caracteristique");
const interactCollection = require("../databases/Interaction_user_collection");
const interactItem = require("../databases/Interaction_user_item");
const interactCommunaute = require("../databases/Interaction_user_communaute");
const validator = require('validator');
exports.userRouter.get("/all", checkJwt(0), async (request, reponse) => {
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
exports.userRouter.get("/:id", checkJwt(1), async (request, reponse) => {
    const user = await User.findByPk(request.params.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        RoleId: user.RoleId
    };
    if (user) {
        reponse.status(200).json(userWithoutPassword);
    }
    else {
        reponse.status(404).json("cannot find user");
    }
});
exports.userRouter.post("/signup", async (request, reponse) => {
    const signUpForm = request.body;
    if (!signUpForm.name || validator.isEmpty(signUpForm.name)) {
        return reponse.status(400).json({ error: "Name is required" });
    }
    if (!signUpForm.email || !validator.isEmail(signUpForm.email)) {
        return reponse.status(400).json({ error: "Invalid email format" });
    }
    if (!signUpForm.password || !validator.isLength(signUpForm.password, { min: 8 })) {
        return reponse.status(400).json({ error: "Password must be at least 8 characters" });
    }
    try {
        let role = await Role.findOne({ where: { name: "User" } });
        if (!role) {
            role = await Role.create({
                name: "User",
                importance: 1
            });
        }
        const user = await User.create({
            name: signUpForm.name,
            email: signUpForm.email,
            password: signUpForm.password,
            RoleId: role.id
        });
        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            RoleId: user.RoleId
        };
        reponse.status(200).json(userWithoutPassword);
    }
    catch (error) {
        console.log(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return reponse.status(409).json({ error: "Email or name already in use" });
        }
        if (error.name === 'SequelizeValidationError') {
            return reponse.status(400).json({ error: error.errors.map(err => err.message) });
        }
        return reponse.status(500).json({ error: "An error has occurred" });
    }
});
exports.userRouter.post("/signin", async (request, reponse) => {
    const signInForm = request.body;
    if (!signInForm.email || !validator.isEmail(signInForm.email)) {
        return reponse.status(400).json({ error: "Email incorrect" });
    }
    if (!signInForm.password || !validator.isLength(signInForm.password, { min: 8 })) {
        return reponse.status(400).json({ error: "Mauvais mot de passe" });
    }
    try {
        const user = await User.findOne({
            where: {
                email: signInForm.email
            }
        });
        if (!user) {
            return reponse.status(401).json("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(signInForm.password, user.password);
        if (!isPasswordValid) {
            return reponse.status(401).json("Invalid email or password");
        }
        const importance = (await user.getRole()).importance;
        const secret = await readFile("secret.txt", { encoding: "utf8" });
        const playload = { id: user.id, name: user.name, importance: importance };
        const newToken = jwt.sign(playload, secret, { expiresIn: "2h", algorithm: "HS256" });
        return reponse.status(200).json({ token: newToken });
    }
    catch (error) {
        console.log(error);
        reponse.status(500).json("An error has occurred");
    }
});
exports.userRouter.put("/", checkJwt(1), async (request, reponse) => {
    const modification = request.body;
    const userIdFromToken = request.user.id;
    const user = await User.findByPk(modification.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (!user) {
        return reponse.status(404).json("An error has occured");
    }
    if (userIdFromToken !== user.id && request.user.importance < 2) {
        return reponse.status(403).json("You dont have permission to modify this User");
    }
    user.email = modification.email;
    user.name = modification.name;
    user.password = modification.password;
    await user.save()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("User has been modified");
});
//Interaction
//caracteristique
exports.userRouter.post("/interaction/caracteristique", checkJwt(1), async (request, reponse) => {
    const post = request.body;
    const interactionItem = interactCaracteristique.create({
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
    reponse.status(200).json("Interaction has been had");
});
exports.userRouter.put("/interaction/caracteristique", async (request, reponse) => {
    const modification = request.body;
    const post = await interactCaracteristique.findByPk(modification.postId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    post.like = modification.like;
    post.dislike = modification.dislike;
    post.post = modification.post;
    if (post) {
        await post.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("Post has been modified");
    }
    else {
        reponse.status(404).json("cannot find post");
    }
});
exports.userRouter.delete("/interaction/caracteristique/:id", checkJwt(1), async (request, reponse) => {
    const postId = request.params.id;
    interactCaracteristique.destroy({
        where: {
            id: postId
        }
    }).catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("Post has been deleted");
});
//collection
exports.userRouter.post("/interaction/collection", checkJwt(1), async (request, reponse) => {
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
    reponse.status(200).json("Interaction has been had");
});
exports.userRouter.put("/interaction/collection/:id", checkJwt(1), async (request, reponse) => {
    const modification = request.body;
    const post = await interactCollection.findByPk(modification.postId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    post.like = modification.like;
    post.dislike = modification.dislike;
    post.post = modification.post;
    if (post) {
        await post.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("Post has been modified");
    }
    else {
        reponse.status(404).json("cannot find post");
    }
});
exports.userRouter.delete("/interaction/collection/:id", checkJwt(1), async (request, reponse) => {
    const postId = request.params.id;
    interactCollection.destroy({
        where: {
            id: postId
        }
    }).catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("Post has been deleted");
});
//item
exports.userRouter.post("/interaction/item", checkJwt(1), async (request, reponse) => {
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
    reponse.status(200).json("Interaction has been had");
});
exports.userRouter.put("/interaction/item/:id", checkJwt(1), async (request, reponse) => {
    const modification = request.body;
    const post = await interactItem.findByPk(modification.postId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    post.like = modification.like;
    post.dislike = modification.dislike;
    post.post = modification.post;
    if (post) {
        await post.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("Post has been modified");
    }
    else {
        reponse.status(404).json("cannot find post");
    }
});
exports.userRouter.delete("/interaction/item/:id", checkJwt(1), async (request, reponse) => {
    const postId = request.params.id;
    interactItem.destroy({
        where: {
            id: postId
        }
    }).catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("Post has been deleted");
});
//communauté
exports.userRouter.post("/interaction/communaute", checkJwt(1), async (request, reponse) => {
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
    reponse.status(200).json("Interaction has been had");
});
exports.userRouter.put("/interaction/communaute/:id", checkJwt(1), async (request, reponse) => {
    const modification = request.body;
    const post = await interactCommunaute.findByPk(modification.postId)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    post.like = modification.like;
    post.dislike = modification.dislike;
    post.post = modification.post;
    if (post) {
        await post.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("Post has been modified");
    }
    else {
        reponse.status(404).json("cannot find post");
    }
});
exports.userRouter.delete("/interaction/communaute/:id", checkJwt(1), async (request, reponse) => {
    const postId = request.params.id;
    interactCommunaute.destroy({
        where: {
            id: postId
        }
    }).catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("Post has been deleted");
});
exports.userRouter.post("/image", checkJwt(1), async (request, reponse) => {
    const body = request.body;
    try {
        const user = await User.findByPk(body.userId);
        if (!user) {
            return reponse.status(404).json("User not found");
        }
        const image = await Image.create({
            url: body.url
        });
        await user.setImage(image);
        reponse.status(200).json(image);
    }
    catch (error) {
        console.log(error);
        return reponse.status(500).json("An error has occurred");
    }
});
exports.userRouter.get("/image/:userId", checkJwt(1), async (request, reponse) => {
    const userId = request.params.userId;
    try {
        console.log(userId);
        const user = await User.findByPk(userId);
        if (!user) {
            return reponse.status(404).json("User not found");
        }
        const image = await user.getImage();
        reponse.status(200).json(image);
    }
    catch (error) {
        console.log(error);
        return reponse.status(500).json("An error has occurred");
    }
});
exports.userRouter.post("/category", checkJwt(1), async (request, reponse) => {
    const body = request.body;
    try {
        const user = await User.findByPk(body.userId);
        const category = await Category.create({
            name: body.name
        });
        await user.addCategory(category);
        reponse.status(200).json(category);
    }
    catch (error) {
        console.log(error);
        return reponse.status(500).json("An error has occurred");
    }
});
exports.userRouter.get("/category/:userId", checkJwt(1), async (request, reponse) => {
    const userId = request.params.userId;
    try {
        const user = await User.findByPk(userId);
        const category = await user.getCategories();
        reponse.status(200).json(category);
    }
    catch (error) {
        console.log(error);
        return reponse.status(500).json("An error has occurred");
    }
});
