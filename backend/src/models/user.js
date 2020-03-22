'use strict';
import { NAME_PATTERN, SALT_ROUND } from '../constants';

import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define( 'User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: NAME_PATTERN,
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: NAME_PATTERN,
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.TEXT,
      field: 'passwordHash',
      allowNull: false,
      set (val) {
        this.setDataValue( 'password', bcrypt.hashSync( val, SALT_ROUND ) );
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {} );
  User.associate = function (models) {
    User.hasMany( models.Task, {
      foreignKey: 'userId'
    } );
    User.hasMany( models.RefreshToken, {
      foreignKey: 'userId'
    } );
  };
  return User;
}