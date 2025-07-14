import express from "express"
import dotenv from "dotenv"
import { mongoDbconnect } from "./config/MongoDb_connect.js"
import cors from 'cors'
import userRoutes from './Routes/user.routes.js'

dotenv.config()

const app=express()

// Middlewares

app.use(cors({
    origin:"*"
}))
app.use(express.json())


// Routes

app.use("/api",userRoutes)



const port =process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`app is started on port ${port}`);
    mongoDbconnect()
})