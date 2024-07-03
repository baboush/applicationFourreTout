import * as z from "zod";

const titleMovieSchema = z.string().max(80).min(3);

export type TitleMovie = z.infer<typeof titleMovieSchema>;

const posterMovieSchema = z.string().max(250).min(50);

export type PosterMovie = z.infer<typeof posterMovieSchema>;

const directorMovieSchema = z.string().max(250).min(10);

export type DirectorMovie = z.infer<typeof directorMovieSchema>;

export const movieSchema = z.object({
  title: titleMovieSchema,
  director: directorMovieSchema,
  poster: posterMovieSchema,
});
