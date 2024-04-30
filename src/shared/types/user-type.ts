import Joi from 'joi';

const usernameSchema = Joi.string()
  .max(80)
  .min(4)
  .pattern(new RegExp('/^[a-zA-Z0-9s]*$/'))
  .required();

export type Ursername = Joi.Schema<typeof usernameSchema>;

const passwordSchema = Joi.string()
  .pattern(
    new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd!@#$%^&*()_+]{8,20}$',
    ),
  )
  .required();

export type Password = Joi.Schema<typeof passwordSchema>;

const emailSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net', 'fr'] },
});

export type Email = Joi.Schema<typeof emailSchema>;

const roleSchema = Joi.string().max(12).min(4).required();

export type Role = Joi.Schema<typeof roleSchema>;
