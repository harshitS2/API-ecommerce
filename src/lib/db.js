import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// Connect to MongoDB

const connectDB = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected MongoDB", db.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB", error.message);
    }
}

export default connectDB;