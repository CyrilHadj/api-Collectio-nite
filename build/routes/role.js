"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRouter = void 0;
const express = require("express");
exports.roleRouter = express.Router();
const checkJwt = require("../middleware/checkjwt");
const Role = require("../databases/Role");
exports.roleRouter.get("/all", checkJwt(1), async (request, reponse) => {
    const model = await Role.findAll()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (Role) {
        reponse.status(200).json(Role);
    }
    else {
        reponse.status(400).json("cannot get all role");
    }
    ;
});
exports.roleRouter.get("/:id", checkJwt(1), async (request, reponse) => {
    const model = await Role.findByPk(request.params.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    if (model) {
        reponse.status(200).json(Role);
    }
    else {
        reponse.status(404).json("cannot find role");
    }
});
exports.roleRouter.post("/", checkJwt(1), async (request, reponse) => {
    const body = request.body;
    const role = await Role.create({
        name: body.name,
        importance: body.importance
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json(role);
});
exports.roleRouter.delete("/:id", checkJwt(1), async (request, reponse) => {
    const id = request.params.id;
    Role.destroy({
        where: {
            id: id
        }
    })
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    reponse.status(200).json("role has been deleted");
});
exports.roleRouter.put("/", checkJwt(1), async (request, reponse) => {
    const modification = request.body;
    const role = await Role.findByPk(modification.id)
        .catch(error => {
        console.log(error);
        reponse.status(500).json("an error has occured");
    });
    role.name = modification.name;
    role.importance = modification.importance;
    if (role) {
        await role.save()
            .catch(error => {
            console.log(error);
            reponse.status(500).json("an error has occured");
        });
        reponse.status(200).json("role has been modified");
    }
    else {
        reponse.status(404).json("an error has occured");
    }
});
