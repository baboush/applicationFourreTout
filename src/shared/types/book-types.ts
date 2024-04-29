import Joi from 'joi';

const titleBookSchema = Joi.string().max(80).min(3).required();

export type TitleBook = Joi.Schema<typeof titleBookSchema>;

const posterBookSchema = Joi.string().max(250).min(50).required();

export type PosterBook = Joi.Schema<typeof posterBookSchema>;

const authorBookSchema = Joi.string().max(250).min(10).required();

export type AuthorBook = Joi.Schema<typeof authorBookSchema>;
