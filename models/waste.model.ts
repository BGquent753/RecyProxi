import mongoose, {Document, Model, Schema} from 'mongoose';

const wasteSchema = new Schema<Waste>({
    name:{
        type: Schema.Types.String,
        required: true
    },
    price:{
        type:Schema.Types.String,
        required:true
    }
},{
    versionKey:false,
    collection:"waste"
});

export interface Waste{
    _id:string
    name:string
    price:string
};

export const WasteModel= mongoose.model("Waste", wasteSchema);