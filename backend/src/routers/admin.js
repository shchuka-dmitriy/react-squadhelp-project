import express  from 'express';
import {User} from './../models/index.js';

const adminRouter = express.Router();

adminRouter.route( '/users' )
           .get( async (req, res, next) => {
             try {
               const users = await User.findAll( {
                                                   limit: req.query.limit || 40,
                                                   offset: req.query.offset || 0,
                                                   attributes: {
                                                     exclude: ['password']
                                                   }
                                                 } );
               res.send( users );
             } catch (e) {
               next( e );
             }
           } );

export default adminRouter;

