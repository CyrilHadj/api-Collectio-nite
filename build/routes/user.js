"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = require("express");
const bcrypt = require("bcrypt");
exports.userRouter = express.Router();
const User = require("../databases/User");
//User
//GET USERS
exports.userRouter.get("/all", async (request, reponse) => {
    const users = await User.findAll()
        .catch(error => { console.log(error); });
    reponse.status(200).json(users);
});
//GET user by id
exports.userRouter.get("/:id", async (request, reponse) => {
    const user = await User.findByPk(request.params.id)
        .catch(error => { console.log(error); });
    reponse.status(200).json(user);
});
//Post User SignUp
exports.userRouter.post("/signup", async (request, reponse) => {
    const signUpForm = request.body;
    const user = await User.create({
        name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password
    })
        .catch(error => { console.log(error); });
    reponse.status(200).json(user);
});
//Post User SignIn
exports.userRouter.post("/signin", async (request, reponse) => {
    const signInForm = request.body;
    const user = await User.findOne({
        where: {
            email: signInForm.email
        }
    }).catch(error => { console.log(error); });
    const isPasswordValid = await bcrypt.compare(signInForm.password, user.password)
        .catch(error => { console.log(error); });
    if (isPasswordValid) {
        return reponse.status(200).json("connected");
    }
    else {
        reponse.status(401).json("Identifiant invalid");
    }
});
//UPDATE User
exports.userRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const user = await User.findByPk(modification.id)
        .catch(error => { console.log(error); });
    user.email = modification.email;
    user.name = modification.name;
    user.password = modification.password;
    await user.save()
        .catch(error => { console.log(error); });
    reponse.status(200).json("User has been modified");
});
