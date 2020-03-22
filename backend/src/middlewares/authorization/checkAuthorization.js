import { AuthorizationError, AuthenticationTimeoutError } from '../../utils/errors';
import jwt                                                from 'jsonwebtoken';
import util                                               from 'util';

const verifyAsync = util.promisify( jwt.verify );

export default async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      req.authorizationData = await verifyAsync( req.headers.authorization, 'secret' );
      return next();
    }
    next( new AuthorizationError() );
  } catch (e) {
    next( new AuthenticationTimeoutError() );
  }
}