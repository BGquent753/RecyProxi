import * as express from "express";
import {Router, Request, Response} from "express";
import {Model} from "mongoose";
import {User, UserModel} from "../models";

export class UserController{
    readonly path: string;
    readonly model:Model<User>;

    constructor() {
        this.path= '/user';
        this.model = UserModel;
    };

    async getAll(req:Request, res:Response):Promise<void>{
        const users = await this.model.find().exec();
        res.json(users);
    };

    rightUserPassword(req:Request, res:Response)/*:Promise<void>*/{
        const user = this.model.findOne({
            userName:req.body.userName,
            password:req.body.password
        }).exec();
        user.then(function(u){
            const str = JSON.stringify(u);
            if(userNotEmpty(str)){
                res.send(u)
            }
            else{
                res.send("ERROR")
            }
        }).catch(function(err){
            console.log(err)
        })
        //res.send("OK")
    }

    buildRoutes():Router{
        const router = express.Router();
        router.get('/auth',express.json(), this.rightUserPassword.bind(this));
        router.get('/', this.getAll.bind(this));
        return router;
    };
}

function userNotEmpty(user:string):boolean{
    return user !== "null";

}