import * as express from "express";
import {Router, Request, Response} from "express";
import {Model} from "mongoose";
import {User, UserModel} from "../users";

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

    async rightUserPassword(req:Request, res:Response):Promise<void>{
        const user = await this.model.findOne({
            userName:req.body.userName,
            password:req.body.password
        }).exec();
        res.send(user);
    };

    //function userNotEmpty(user:)

    buildRoutes():Router{
        const router = express.Router();
        router.get('/auth',express.json(), this.rightUserPassword.bind(this));
        router.get('/', this.getAll.bind(this));
        return router;
    };
}