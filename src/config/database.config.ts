import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

const connectDatabase = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI!);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to the database;", error);
    }
};


export default connectDatabase;