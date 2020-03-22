import { loginByEmail }                           from '../middlewares/authentication';
import {
  findRefreshToken, getUserByRefreshToken,
  signAccessToken,
  signRefreshToken, updateRefreshToken,
  verifyRefreshToken
}                                                 from '../middlewares/authentication/tokens.js';
import express                                    from 'express';
import { RefreshTokenController, UserController } from '../controllers';
import { createValidationMW }                     from '../middlewares/validation';
import { LOGIN_USER_SCHEMA, SING_UP_USER_SCHEMA } from '../utils/validation/user.js';

const authenticationRoute = express.Router();

const sendAuthData = (req, res, next) => {
  const { accessTokenValue, refreshTokenValue, preparedUser } = req;
  res.send( {
              user: preparedUser,
              tokenPair: {
                accessToken: accessTokenValue,
                refreshToken: refreshTokenValue,
              },
            } );
};

const prepareUser = (req, res, next) => {

  const { user } = req;
  const preparedUser = user.get();
  delete preparedUser.password;
  req.preparedUser = preparedUser;
  next();

};

authenticationRoute.post( '/sign_in',
                          createValidationMW( LOGIN_USER_SCHEMA ),                          /*обрабботчик для валидации на создание юзера и передаем схему*/
                          loginByEmail,
                          signRefreshToken,
                          RefreshTokenController.saveRefreshToken,                          /*сохраняем токен в базе данных*/
                          signAccessToken,
                          prepareUser,
                          sendAuthData
);
authenticationRoute.post( '/sign_up',
                          createValidationMW( SING_UP_USER_SCHEMA ),
                          UserController.createUser,
                          signRefreshToken,
                          RefreshTokenController.saveRefreshToken,
                          signAccessToken,
                          prepareUser,
                          sendAuthData
);
authenticationRoute.post( '/refresh_sign_in',
                          verifyRefreshToken,
                          findRefreshToken,
                          getUserByRefreshToken,
                          signRefreshToken,
                          updateRefreshToken,
                          signAccessToken,
                          prepareUser,
                          sendAuthData,
);

authenticationRoute.post( '/refresh_tokens',
                          verifyRefreshToken,
                          findRefreshToken,
                          getUserByRefreshToken,
                          signRefreshToken,
                          updateRefreshToken,
                          signAccessToken,
                          (req, res) => {
                            const { accessTokenValue, refreshTokenValue } = req;
                            res.send( {
                                        tokenPair: {
                                          accessToken: accessTokenValue,
                                          refreshToken: refreshTokenValue,
                                        }
                                      } );
                          }
);

export default authenticationRoute;
