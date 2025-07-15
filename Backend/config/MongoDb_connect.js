import mongoose from "mongoose";

// asynchronous function to connect to MongoDB
export const mongoDbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
