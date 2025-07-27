import express from 'express';
import authMiddleware from '../middleware/auth.js'
import { createTask, deleteTask, getTask, getTaskById, update } from '../controller/taskController.js';
const taskRouter = express.Router();

taskRouter.route('/gp')
.get(authMiddleware,getTask)
.post(authMiddleware,createTask)

taskRouter.route('/:id/gp')
    .get(authMiddleware,getTaskById)
    .put(authMiddleware,update)
    .delete(authMiddleware,deleteTask)

    export default taskRouter;