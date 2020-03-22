import { RefreshToken } from './../models';

import Controller          from './../utils/controller';
import { BadRequestError } from '../utils/errors';

class RefreshTokenController {

  constructor () {
    this._controller = new Controller( RefreshToken );
  }

  saveRefreshToken = async (req, res, next) => {
    try {
      const refreshToken = await this._controller.create( {
                                                            value: req.refreshTokenValue,
                                                            userId: req.user.id,
                                                          } );

      if (refreshToken) {
        return next();
      }
      next( new BadRequestError() );
    } catch (e) {
      next( e );
    }
  };
}



export default new RefreshTokenController();