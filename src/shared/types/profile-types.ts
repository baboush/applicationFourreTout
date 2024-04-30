import Joi from 'joi';

const nameSchema = Joi.string()
  .max(40)
  .min(3)
  .pattern(new RegExp('^[A-Z][a-zA-Z]*$'))
  .required();

export type Name = Joi.Schema<typeof nameSchema>;

const surnameSchema = Joi.string()
  .max(50)
  .min(3)
  .pattern(new RegExp('^[A-Z][a-zA-Z]*$'))
  .required();

export type Surname = Joi.Schema<typeof surnameSchema>;
