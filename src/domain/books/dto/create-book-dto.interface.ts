import { AuthorBook, PosterBook, TitleBook } from "@shared/types";

/**
 * Interface representing a DTO (Data Transfer Object) used to create a new book.
 */
export interface CreateBookDto {
  /**
   * Optional unique identifier of the book. (usually set by the server)
   */
  readonly id?: number;

  /**
   * Title of the book.
   */
  readonly title: TitleBook;

  /**
   * Author of the book.
   */
  readonly author: AuthorBook;

  /**
   * Poster image URL of the book.
   */
  readonly poster: PosterBook;
}
