import { LoginUserSchema } from '@shared/schemas';
import Joi from 'joi';

//TODO: Separer schema et type
export const usernameSchema = Joi.string()
  .max(80)
  .min(4)
  .pattern(new RegExp('/^[a-zA-Z0-9s]*$/'))
  .required();

export type Username = Joi.Schema<typeof usernameSchema>;

export const passwordSchema = Joi.string()
  .pattern(
    new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd!@#$%^&*()_+]{8,20}$',
    ),
  )
  .required();

export type Password = Joi.Schema<typeof passwordSchema>;

export const emailSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net', 'fr'] },
});

export type Email = Joi.Schema<typeof emailSchema>;

export const roleSchema = ['ADMIN', 'USER', 'MODERATEUR'];

export type Role = Joi.Schema<typeof roleSchema>;

export type LoginUser = Joi.Schema<typeof LoginUserSchema>;
