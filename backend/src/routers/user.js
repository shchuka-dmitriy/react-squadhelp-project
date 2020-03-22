import express            from 'express';
import UserController  from '../controllers/user.js';

const userRouter = express.Router();


userRouter.route( '/user(/:id)?' )
          .post( UserController.createUser )
          .get( UserController.getUserById )
          .patch( UserController.updateUserById )
          .delete( UserController.deleteUserById );

export default userRouter;
