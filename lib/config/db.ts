import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect("")
    console.log("DB connected")
}