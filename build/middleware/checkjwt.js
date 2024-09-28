"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const { readFileSync } = require("node:fs");
const secret = readFileSync("secret.txt", { encoding: "utf8" });
function checkJwt(importance) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!authHeader) {
            res.status(401).json("Unauthorized");
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, secret, (error, decodedToken) => {
            console.log(decodedToken);
            if (error) {
                res.status(401).json("Unauthorized, wrong token");
                console.log(error);
                return;
            }
            if (importance <= decodedToken.importance) {
                next();
            }
            else {
                res.status(401).json("Unauthorized role");
            }
        });
    };
}
module.exports = checkJwt;
