import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://Keerthana:tech2004@cluster0.weq9nje.mongodb.net/mydatabase?retryWrites=true&w=majority')
    .then(() => console.log('db connected'));
    console.log("MongoDB connection state:", mongoose.connection.readyState);
}