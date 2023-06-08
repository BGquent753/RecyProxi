import mongoose, {Model, Schema} from "mongoose";
import {User} from "./users.model";

const sessionSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",//nom du model pour jointure
        required:true
    },
    platform:{
        type:Schema.Types.String
    }
},{
    versionKey: false,
    collection: "Sessions"
})

export interface Session{
    _id:string//token
    user:string | User
    platform?:string
}

export const SessionModel = mongoose.model<Session>("Session", sessionSchema);