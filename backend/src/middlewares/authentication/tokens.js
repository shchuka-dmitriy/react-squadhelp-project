import jwt                                     from 'jsonwebtoken';
import util                                    from 'util';
import { AuthorizationError, BadRequestError } from '../../utils/errors';
import { RefreshToken }                        from './../../models';
import { COUNT_USER_DEVICES }                  from '../../constants';

const sign = util.promisify( jwt.sign );
const verify = util.promisify( jwt.verify );

export const verifyRefreshToken = async (req, res, next) => {
  try {
    const { body: { refreshToken } } = req;
    req.refreshTokenPayload = await verify( refreshToken, 'secret' );
    next();
  } catch (e) {
    next( new AuthorizationError() );
  }
};

export const signRefreshToken = async (req, res, next) => {
  try {
    const { user } = req;
    req.refreshTokenValue = await sign( {
                                          userId: user.id,
                                        }, 'secret', {
                                          expiresIn: '30d',
                                        } );
    next();

  } catch (e) {
    next( e );
  }
};

export const signAccessToken = async (req, res, next) => {
  try {
    const { user } = req;
    req.accessTokenValue = await sign( {                                    /*сохраняем авторизационные данные*/
                                         userId: user.id,
                                         email: user.email,
                                       }, 'secret', {
                                         expiresIn: '6s',
                                       } );

    next();
  } catch (e) {
    next( e );
  }
};

export const findRefreshToken = async (req, res, next) => {
  try {

    const {
      body: {
        refreshToken: refreshTokenValue
      },
      refreshTokenPayload: {
        userId
      }
    } = req;
    req.refreshToken = await RefreshToken.findOne( {
                                                     where: {
                                                       value: refreshTokenValue,
                                                       userId,
                                                     }
                                                   } );
    if (req.refreshToken) {

      return next();
    }
    next( new AuthorizationError() );
  } catch (e) {
    next( new AuthorizationError() );
  }

};

export const getUserByRefreshToken = async (req, res, next) => {
  try {
    const user = (await req.refreshToken.getUser());

    if (user) {
      req.user = user;
    }
    next( new AuthorizationError() );
  } catch (e) {
    next( new AuthorizationError() );
  }
};

export const updateRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken, refreshTokenValue } = req;
    const updatedRefreshToken = await refreshToken.update( {
                                                             value: refreshTokenValue
                                                           } );

    if (updatedRefreshToken) {
      return next();
    }
    next( new AuthorizationError() );
  } catch (e) {
    next( new AuthorizationError() );
  }

};

export const saveRefreshToken = async (req, res, next) => {
  try {

    const { user, refreshTokenValue } = req;
    const userRefreshTokensCount = await user.countRefresTokens();
    let newToken = null;
    if (userRefreshTokensCount >= COUNT_USER_DEVICES) {
      const [refreshToken] = await user.getRefreshTokens();
      newToken = await refreshToken.update( {
                                              value: refreshTokenValue,
                                            } );

    } else {

      newToken = await user.createRefreshToken( {
                                                  value: refreshTokenValue,

                                                } );

    }
    if (newToken) {
      return next();
    }
    next( new BadRequestError() );
  } catch (e) {
    next( e );
  }
};