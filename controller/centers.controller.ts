import * as express from "express";
import {Router, Request, Response} from "express";
import {Model} from "mongoose";
import {Center, CenterModel} from "../models";

export class CenterController{
    readonly path: string;
    readonly model:Model<Center>;

    constructor() {
        this.path= '/center';
        this.model = CenterModel;
    };

    async getAll(req:Request, res:Response):Promise<void>{
        const centers = await this.model.find().exec();
        res.json(centers);
    };

    async createCenter(req:Request, res:Response):Promise<void>{
        const add:string = "address";
        const tel:string = "telephone";
        const mail:string = "mail";
        const center = await this.model.create({
            address:add,
            telephone:tel,
            mail:mail,
            wastes:["metal", "papier"]
        });
        res.json(center);
    }

    async centerWithWaste(req:Request, res:Response){
        const center = await this.model.find({
            wastes: req.params.waste
        })
        res.send(center)
    }

    deleteCenter(req:Request, res:Response)/*:Promise<void>*/{
        //const mail = "mail"
        const center = this.model.deleteOne({
            mail:req.params.mail
        }).exec()
        center.then(function (c){
            if(c.deletedCount === 0){
                res.status(404)
                res.send("This center doesn't exist")
            }
            else{
                res.status(200)
                res.json(c)
            }
        })
    }

    /*async patchCenter(req:Request, res:Response){
    }*/


    buildRoutes():Router{
        const router = express.Router();
        router.get('/all', this.getAll.bind(this));

        router.post('/',express.json(), this.createCenter.bind(this))

        router.get('/:waste', this.centerWithWaste.bind(this))

        router.delete('/:mail', this.deleteCenter.bind(this));
        return router;
    }
}