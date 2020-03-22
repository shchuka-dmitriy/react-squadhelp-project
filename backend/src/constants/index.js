export const NAME_PATTERN = /^[A-Z][a-z]{0,255}$/;
export const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z0-9_@#%!?\-^]{8,60}$/;
export const SALT_ROUND = 6;
export const COUNT_USER_DEVICES = 4;
/**
 * @typedef {string} RoleType
 */

/**
 *@readonly
 * @enum {RoleType}
 */
export const ROLE = Object.freeze( {
                                     USER: 'USER',
                                     ADMIN: 'ADMIN',
                                     MODERATOR: 'MODERATOR',
                                   } );

/**
 * @typedef {string} ActionType
 */

/**
 *@readonly
 * @enum {ActionType}
 */
export const ACTION = Object.freeze( {
                                       CREATE: 'CREATE',
                                       READ: 'READ',
                                       UPDATE: 'UPDATE',
                                       DELETE: 'DELETE',
                                       LOGIN: 'LOGIN',
                                       SIGN_UP: 'SIGN_UP',
                                     } );

/**
 * @typedef {string} EntityType
 */

/**
 *@readonly
 * @enum {EntityType}
 */
export const ENTITY = Object.freeze( {
                                       ...ROLE,
                                       TASK: 'TASK',
                                     } );


