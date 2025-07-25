import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' MongoDB connected');
    console.log("MongoDB connection state:", mongoose.connection.readyState);
  } catch (err) {
    console.error(' MongoDB connection error:', err);
  }
};
