import express                from 'express';
import * as ErrorHandlers     from './../middlewares/errorHandler/index.js';
import adminRouter            from './admin.js';
import userRouter             from './user.js';
import taskRouter             from './task.js';
import authenticationRoute    from './authentication.js';
import { checkAuthorization } from './../middlewares/authorization';

const router = express.Router();

router.use( authenticationRoute );
router.use( checkAuthorization );
router.use( '/admin', adminRouter );
router.use( userRouter );
router.use( taskRouter );

router.use( ErrorHandlers.handleValidationError );
router.use( ErrorHandlers.handleApplicationError );
router.use( ErrorHandlers.handleSequelizeError );

export default router;
