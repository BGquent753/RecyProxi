import {config} from 'dotenv'
config()

import * as mongoose from "mongoose";
import {UserModel} from './users'
import * as express from 'express';
import {UserController} from "./controller";

async function startServer(){
    const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
        auth:{
            username: process.env.MONGODB_USR,
            password: process.env.MONGODB_PSW
        },
        authSource:"admin"
    });

    const app = express();
    const animalController = new UserController();
    app.use(animalController.path, animalController.buildRoutes());
    app.listen(process.env.PORT, function(){
        console.log(`Server listen port ${process.env.PORT}`)
    })
}

startServer().catch(function (err){
    console.error(err);
})