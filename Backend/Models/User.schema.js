import mongoose from "mongoose";

const Userschema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    totalPoints:{
        type:Number,
        default:0
    }

},{timestamps:true})

let User=mongoose.model("User",Userschema)

export default User