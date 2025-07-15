import express from "express"
import dotenv from "dotenv"
import { mongoDbconnect } from "./config/MongoDb_connect.js"
import cors from 'cors'
import userRoutes from './Routes/user.routes.js'
import { Server } from "socket.io"
import http from 'http'



dotenv.config()

const app=express()

const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["POST", "GET"]
    }
})

app.set("io",io)

// Middlewares

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json())


// Routes

app.use("/api",userRoutes)



const port =process.env.PORT || 4000

server.listen(port,()=>{
    console.log(`app is started on port ${port}`);
    mongoDbconnect()
})