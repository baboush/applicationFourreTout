import z from 'zod';

const titleBookSchema = z.string().max(80).min(3);

export type TitleBook = z.infer<typeof titleBookSchema>;

const posterBookSchema = z.string().max(250).min(50);

export type PosterBook = z.infer<typeof posterBookSchema>;

const authorBookSchema = z.string().max(250).min(10);

export type AuthorBook = z.Schema<typeof authorBookSchema>;
