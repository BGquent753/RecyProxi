import mongoose, {Document, Model, Schema} from 'mongoose';
import {Role} from "./role.model";

const userSchema = new Schema<User>({
    name:{
        type: Schema.Types.String,
        required: true
    },
    firstName:{
        type:Schema.Types.String,
        required:true
    },
    birthDate:{
        type:Schema.Types.Date
    },
    address:{
        type:Schema.Types.String,
        required:true
    },
    mail:{
        type:Schema.Types.String,
        required:true
    },
    login:{
        type: Schema.Types.String,
        index:true,
        unique:true,
        required: true
    },
    password:{
        type:Schema.Types.String,
        required:true
    },
    roles:[
        {
            type:Schema.Types.ObjectId,
            ref:"Role",
            required:true
        }
    ]
},{
    versionKey:false,
    collection:"users"
});

export interface User{
    name:string,
    firstName: string,
    birthDate?:Date,
    address:string,
    mail:string,
    login:string,
    password:string
    roles: string[] | Role[]
};

export const UserModel:Model<User>= mongoose.model("User", userSchema);