import { AuthorBook, PosterBook, TitleBook } from '@shared/types';

export interface Book {
  readonly title: TitleBook;
  readonly poster: PosterBook;
  readonly author: AuthorBook;
}
