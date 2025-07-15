import mongoose from "mongoose";

// Define the schema for the User collection
const Userschema=mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim: true,
    },
    totalPoints:{
        type:Number,
        default:0
    }

},{timestamps:true})

// Create the User model from the schema
let User=mongoose.model("User",Userschema)

// Export the model so it can be used in controllers/services
export default User