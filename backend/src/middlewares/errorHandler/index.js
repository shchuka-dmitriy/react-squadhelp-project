import { ApplicationError } from '../../utils/errors/index.js';

import Sequielize from 'sequelize';

import Joi from '@hapi/joi';

export function handleValidationError (err, req, res, next) {
  if (err instanceof Joi.ValidationError) {
    const { details: [{ message }] } = err;
    return res.status( 400 ).send( message );
  } else {
    next( err );
  }
}

export function handleSequelizeError (err, req, res, next) {
  if (err instanceof Sequielize.ValidationError) {
    const { errors: [{ value, message }] } = err;
    return res.status( 400 ).send( `Value "${value}" is invalid. ${message}.` );
  } else {
    next( err );
  }
}

export function handleApplicationError (err, req, res, next) {
  if (err instanceof ApplicationError) {
    return res.status( err.status ).send( err.message );
  } else {
    next( err );
  }
}
