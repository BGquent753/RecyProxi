import * as express from "express";
import {Router, Request, Response} from "express";
import {Model} from "mongoose";
import {Center, CenterModel, Waste, WasteModel} from "../models";

export class CenterController{
    readonly path: string;
    readonly model:Model<Center>;

    constructor() {
        this.path= '/center';
        this.model = CenterModel;
    };

    async getAll(req:Request, res:Response):Promise<void>{
        const centers = await this.model.find().populate({path:"wastes"}).exec();
        res.json(centers);
    };

    async createCenter(req:Request, res:Response):Promise<void>{
        const center = await this.model.create({
            address:req.body.address,
            telephone:req.body.telephone,
            mail:req.body.mail,
            wastes:req.body.wastes
        });
        res.json(center);
    }

    async addWaste(req:Request, res:Response){
        const waste = await WasteModel.findOne({
            name: req.params.name
        })

        const center = await this.model.findOneAndUpdate({
            _id:req.body.id
        },{
            $push:{wastes:waste}
        }).exec() as Center

        const newCenter = await this.model.findOne({
            _id:req.body.id
        }).populate({
            path:"wastes"
        }).exec()

        res.json(newCenter)
    }

    async deleteWaste(req:Request, res:Response){
        const waste = await WasteModel.findOne({
            name:req.params.name
        }) as Waste

        const center = await this.model.findOneAndUpdate({
            _id:req.body.id
        },{
            "$pull":{
                "wastes":waste._id
            }
        })

        const newCenter = await this.model.findOne({
            _id:req.body.id
        })


        res.json(newCenter)
    }

    async centerWithWaste(req:Request, res:Response){
        const tab = req.body.tab
        const request:{wastes:string}[] = []
        for (let i in tab){
            const name = tab[i]
            const waste = await WasteModel.findOne({
                name:name
            }) as Waste
            request.push({wastes:waste._id})
        }
        const centers = await this.model.find({
            $or:request
        }).populate({
            path:"wastes"
        }).exec()
        res.json(centers)
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

    async patchCenter(req:Request, res:Response){
        const center = await this.model.findOneAndUpdate({
            _id:req.body.id
        },{
            address:req.body.address,
            telephone:req.body.telephone,
            mail:req.body.mail
        })

        const newCenter = await this.model.findOne({
            _id:req.body.id
        })

        res.json(newCenter)
    }


    buildRoutes():Router{
        const router = express.Router();
        router.get('/all', this.getAll.bind(this));
        router.get('/:waste',express.json(), this.centerWithWaste.bind(this))

        router.post('/',express.json(), this.createCenter.bind(this))

        router.patch('/add/:name', express.json(), this.addWaste.bind(this))
        router.patch('/del/:name', express.json(), this.deleteWaste.bind(this))
        router.patch('/patch', express.json(), this.patchCenter.bind(this))

        router.delete('/:mail', this.deleteCenter.bind(this));
        return router;
    }
}