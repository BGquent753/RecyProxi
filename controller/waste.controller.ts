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

    async getWaste(req:Request, res:Response){
        const waste = await this.model.findOne({
            name:req.params.name
        }).exec()
        res.json(waste)
    }

    async add(req:Request, res:Response){
        const waste = await this.model.create({
            name:req.body.name,
            price:req.body.price
        })
        res.json(waste)
    }

    async delete(req:Request, res:Response){
        const waste = await this.model.deleteOne({
            name:req.params.name
        }).exec()
        res.json(waste)
    }

    async patchWaste(req:Request, res:Response){
        const waste = await this.model.findOneAndUpdate({
            name:req.body.name
        },{
            price:req.body.price
        })

        const newWaste = await this.model.findOne({
            name:req.body.name
        })

        res.send(newWaste)
    }


    buildRoutes():Router{
        const router = express.Router();
        router.get('/all', this.getAll.bind(this));
        router.get('/:name', this.getWaste.bind(this));

        router.patch('/patch', express.json(), this.patchWaste.bind(this))

        router.post('/add', express.json(), this.add.bind(this))
        router.delete('/delete/:name', this.delete.bind(this))

        return router;
    }
}