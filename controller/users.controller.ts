import * as express from "express";
import {Router, Request, Response} from "express";
import {Model} from "mongoose";
import {User, UserModel} from "../models";
import {SecurityUtils} from "../utils/security.utils";
import {SessionModel} from "../models/session.model";
import {Role, RoleModel} from "../models/role.model";
import {checkUserToken} from "../middlewares/user.middleware";
import {checkUserRole} from "../middlewares/role.middleware";

export class UserController{
    readonly path: string;
    readonly model:Model<User>;
    guestRole: Role | null

    constructor() {
        this.path= '/user';
        this.model = UserModel;
        this.guestRole = null
    };

    async getAll(req:Request, res:Response):Promise<void>{
        const users = await this.model.find().populate({
            path:"roles"
        }).exec();
        res.json(users);
    }

    async getUser(req:Request, res:Response){
        const user = await this.model.findOne({
            login:req.params.login
        })
        res.send(user)
    }

    private async loadGuestRole(){
        if(this.guestRole){
            return
        }
        this.guestRole = await RoleModel.findOne({name:"guest"}).exec()
    }
    async subscribe(req:Request, res:Response){
        if(!req.body){
            res.status(400).end()
            return
        }
        if(typeof req.body.login !== 'string' || req.body.login.length < 4){
            res.status(400).send("Error in login, thanks to follow these rules:\n- minimum 4 caracters\n- only string")
            return
        }
        if(typeof req.body.password !== 'string' || req.body.password.length < 8){
            res.status(400).send("Error in password, thanks to follow these rules:\n- minimum 8 caracters\n- only string")
            return
        }
        const login = req.body.login
        const password = req.body.password
        try{
            await this.loadGuestRole()
            const user = await UserModel.create({
                name:req.body.name,
                firstName:req.body.firstName,
                birthDate:req.body.birthDate,
                address:req.body.address,
                mail:req.body.mail,
                login,
                password:SecurityUtils.toSHA512(password),
                roles: [this.guestRole]
            })
            res.send(user)
        }catch(err:unknown){
            const me = err as {[key:string]: unknown}
            if(me["name"] === "MongoServerError" && me["code"] === 11000){
                res.status(409).send("this login already exists, choose another one")
            }
            else{
                res.status(500).send(me)
            }
        }
    }

    async login(req:Request, res:Response){
        if(!req.body || typeof req.body.login !== 'string' || typeof req.body.password !== 'string'){
            res.status(400).end()
            return
        }
        const user = await UserModel.findOne({
            login:req.body.login,
            password:SecurityUtils.toSHA512(req.body.password)
        })
        const platform = req.headers['user-agent']
        const session = await SessionModel.create({
            user:user,
            platform:platform
        })
        res.json({
            token: session._id
        })
        //platform OK
        //user OK
        //token ?
    }

    async me(req:Request, res:Response){
        res.json(req.user)
    }

    buildRoutes():Router{
        const router = express.Router();
        router.get('/all', this.getAll.bind(this));
        router.get('/:login', this.getUser.bind(this))

        router.get('/me', checkUserToken(), this.me.bind(this));
        router.get('/admin', checkUserToken(), checkUserRole("admin"),this.me.bind(this))

        router.post('/subscribe', express.json(), this.subscribe.bind(this))
        router.post('/login', express.json(), this.login.bind(this));
        return router;
    };
}

function userNotEmpty(user:string):boolean{
    return user !== "null";

}