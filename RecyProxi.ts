import {config} from 'dotenv'
config()

import * as mongoose from "mongoose";
import * as express from 'express';
import {UserController, CenterController, WasteController} from "./controller";

async function startServer(){
    const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
        auth:{
            username: process.env.MONGODB_USR,
            password: process.env.MONGODB_PSW
        },
        authSource:"admin"
    });

    const app = express();
    const userController = new UserController();
    const centerController = new CenterController();
    const wasteController = new WasteController();
    app.use(userController.path, userController.buildRoutes());
    app.use(centerController.path, centerController.buildRoutes());
    app.use(wasteController.path, wasteController.buildRoutes());
    app.listen(process.env.PORT, function(){
        console.log(`Server listen port ${process.env.PORT}`)
    })
}

startServer().catch(function (err){
    console.error(err);
})