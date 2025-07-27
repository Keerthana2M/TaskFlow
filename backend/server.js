import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import {connectDB} from './config/db.js'
import userRouter from './routes/usetRoutes.js'
import taskRouter from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/user',userRouter);
app.use('/api/tasks',taskRouter);


// API route
app.get('/api', (req, res) => {
    console.log(" Hit the API route");
    res.send("API working");
});

// Connect to DB then start server
connectDB()
    app.listen(PORT, '0.0.0.0', () => {
        console.log(` Server started on http://localhost:${PORT}`);
    });

