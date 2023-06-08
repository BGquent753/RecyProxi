import {Request, RequestHandler} from "express";
import {Role} from "../models/role.model";

export function checkUserRole(name:string):RequestHandler{
    return async function (req:Request, res, next){
        if(!req.user){
            res.status(401).end()
            return
        }
        const user = req.user
        for(let role of user.roles){
            if(typeof role === 'object' && role.name === name){
                next()
                return
            }
        }
        res.status(403).send("You are note admin")
        //const hasRole = user.roles.some()
    }
}