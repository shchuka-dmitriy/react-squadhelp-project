import Joi                                        from '@hapi/joi';
import { NAME_PATTERN, PASSWORD_PATTERN, ACTION } from '../../constants';
import authenticationRoute                        from '../../routers/authentication.js';

const nameSchema = Joi.string()
                      .pattern( NAME_PATTERN );
const emailSchema = Joi.string()
                       .email();
const passwordSchema = Joi.string()
                          .pattern( PASSWORD_PATTERN );

const userSchema = Joi.object( {
                                 firstName: nameSchema.label( 'First name' ),
                                 lastName: nameSchema.label( 'Last name' ),
                                 email: emailSchema.label( 'Email' ),
                                 password: passwordSchema.label( 'Password' ),
                                 profilePicture: Joi.string(),
                                 confirmPassword: Joi.ref( 'password' ),
                               } );

export const SING_UP_USER_SCHEMA = userSchema.and(
  ...['firstName', 'lastName', 'email', 'password', 'confirmPassword'] );
export const LOGIN_USER_SCHEMA = userSchema.and( ...['email', 'password'] );
export const CREATE_USER_SCHEMA = userSchema.and( ...['firstName', 'lastName', 'email', 'password'] );
export const UPDATE_USER_SCHEMA = userSchema.min( 1 ).max( 6 );

