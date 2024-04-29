import Joi from 'joi';

const titleMovieSchema = Joi.string().max(80).min(3).required();

export type TitleMovie = Joi.Schema<typeof titleMovieSchema>;

const posterMovieSchema = Joi.string().max(250).min(50).required();

export type PosterMovie = Joi.Schema<typeof posterMovieSchema>;

const directorMovieSchema = Joi.string().max(250).min(10).required();

export type DirectorMovie = Joi.Schema<typeof directorMovieSchema>;
