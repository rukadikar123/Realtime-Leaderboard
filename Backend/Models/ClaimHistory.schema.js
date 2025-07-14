import mongoose from "mongoose";

const ClaimHistorySchema=mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Points:{
        type:Number,
    },
    claimedAt:{
        type:Date,
        default:Date.now
    }

},{timestamps:true})

let ClaimHistory=mongoose.model("ClaimHistory",ClaimHistorySchema)

export default User