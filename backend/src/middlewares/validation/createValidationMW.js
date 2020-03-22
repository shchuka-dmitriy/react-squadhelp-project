import { ACTION } from '../../constants';

/**
 *
 * @param {Joi} schema
 * @return {function(ActionType): function(...[*]=)}
 */
function createValidationMW (schema) {

  return async (req, res, next) => {
    try {
      req.body = await schema.validateAsync( req.body );
      next();
    } catch (e) {
      next( e );
    }
  };
}

export default createValidationMW;
