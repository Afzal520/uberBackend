import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,

        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    vehical:{
        color:{
            type:String,
            required:true,
        },
        plate:{
            type:String,
            required:true,
        },
        capcity:{
            type:String,
            required:true,
        },
        motor:{
            type:String,
            required:true,
        }
    },
    socketId: {
        type: String
    }
})

export const Captain = mongoose.model("captain", captainSchema)