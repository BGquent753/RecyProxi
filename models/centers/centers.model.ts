import mongoose, {Document, Model, Schema} from 'mongoose';

const centerSchema = new Schema({
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
    wastes:{
        type:[Schema.Types.String],
        required:true
    }
},{
    versionKey:false,
    collection:"centers"
});

export interface Center{
    address:string,
    telephone:string,
    mail:string,
    wastes:string[]
}

export const CenterModel= mongoose.model("Center", centerSchema);