import express              from 'express';
import TaskController       from '../controllers/task.js';

const taskRouter = express.Router();


taskRouter.route( '/tasks' )
          .get( TaskController.getUserTasks );

taskRouter.route( '/task(/:id)?' )
          .post( TaskController.createTask )
          .get( TaskController.getTaskById )
          .patch( TaskController.updateTaskById )
          .delete( TaskController.deleteTaskById );

export default taskRouter;
