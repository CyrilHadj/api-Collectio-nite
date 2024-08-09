import { json, Op } from "sequelize";

const express = require("express");
const bcrypt = require("bcrypt")
export const userRouter = express.Router();
const User = require("../databases/User");

//User

//GET USERS


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

//GET user by id

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

//Post User SignUp
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

//Post User SignIn
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

//UPDATE User

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