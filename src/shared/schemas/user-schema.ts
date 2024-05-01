import Joi from 'joi';
import {
  passwordSchema,
  emailSchema,
  roleSchema,
  usernameSchema,
} from '@shared/types';

export const UserSchema = Joi.object({
  usrname: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
  role: roleSchema,
});

export const LoginUserSchema = Joi.object({
  username: usernameSchema,
  password: passwordSchema,
});
