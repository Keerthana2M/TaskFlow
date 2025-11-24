import express from 'express';
import { registerUser, getCurrentUser, loginUser, updatePassword, updateProfile } from '../controller/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Private routes
userRouter.get('/me', authMiddleware, getCurrentUser);
userRouter.put('/profile', authMiddleware, updateProfile);
userRouter.put('/password', authMiddleware, updatePassword);

export default userRouter;

