import mongoose, {Document, Model, Schema} from 'mongoose';
import {Waste} from "./waste.model";

const centerSchema = new Schema<Center>({
    address:{
        type:Schema.Types.String,
        required:true
    },
    telephone:{
        type:Schema.Types.String,
        required:true
    },
    mail:{
        type:Schema.Types.String,
        required:true
    },
    wastes:[
        {
            type:Schema.Types.ObjectId,
            ref:"Waste",
            required:true
        }
    ]
},{
    versionKey:false,
    collection:"centers"
});

export interface Center{
    address:string,
    telephone:string,
    mail:string,
    wastes:Waste[]
}

export const CenterModel= mongoose.model("Center", centerSchema);