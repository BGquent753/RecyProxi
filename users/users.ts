import mongoose, {Document, Model, Schema} from 'mongoose';

const userSchema = new Schema({
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
    userName:{
        type:Schema.Types.String,
        required:true
    },
    password:{
        type:Schema.Types.String,
        required:true
    },
    mail:{
        type:Schema.Types.String,
        required:true
    }
},{
    versionKey:false,
    collection:"mongodb-9"
});