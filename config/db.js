import mongoose from "mongoose";

export const connectDatabase = async()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Database connected Successfully")
    })
    .catch(()=>{
        console.log("Database connection failed")
    })
}