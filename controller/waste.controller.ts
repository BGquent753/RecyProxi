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


    buildRoutes():Router{
        const router = express.Router();
        router.get('/all', this.getAll.bind(this));

        return router;
    }
}