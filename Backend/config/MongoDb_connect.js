import mongoose from "mongoose";


export const mongoDbconnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log("mongoDB connected");
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

