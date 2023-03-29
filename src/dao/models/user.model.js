import mongoose from "mongoose";

const userCollection  = 'users'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    dni: Number,
    birthdate: Date,
    gender:{
        type: String,
        enum: ["M", "F", "X"]
    },
    courses: {
       type: Array,
       default: [] 
    }
})

const usersModel = mongoose.model(userCollection, userSchema)

export default usersModel