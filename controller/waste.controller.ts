import * as express from "express";
import {Router, Request, Response} from "express";
import {Model} from "mongoose";
import {Waste, WasteModel} from "../models";

export class WasteController{
    readonly path: string;
    readonly model:Model<Waste>;

    constructor() {
        this.path= '/waste';
        this.model = WasteModel;
    };

    async getAll(req:Request, res:Response):Promise<void>{
        const wastes = await this.model.find().exec();
        res.json(wastes);
    };

    async add(req:Request, res:Response){
        const waste = this.model.create({
            name:req.body.name,
            price:req.body.price
        })
        res.json(waste)
    }

    async delete(req:Request, res:Response){
        const waste = this.model.deleteOne({
            name:req.params.name
        }).exec()
        res.json(waste)
    }


    buildRoutes():Router{
        const router = express.Router();
        router.get('/all', this.getAll.bind(this));
        router.patch('/add', express.json(), this.add.bind(this))
        router.delete('/delete/:name', this.delete.bind(this))

        return router;
    }
}