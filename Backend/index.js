import express from "express"
import dotenv from "dotenv"
import { mongoDbconnect } from "./config/MongoDb_connect.js"

dotenv.config()

const app=express()




const port =process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`app is started on port ${port}`);
    mongoDbconnect()
})