import Joi from 'joi';

const nameCategorySchema = Joi.string().max(40).min(5).required();

export type NameCategory = Joi.Schema<typeof nameCategorySchema>;
