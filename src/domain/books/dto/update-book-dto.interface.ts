import { AuthorBook, PosterBook, TitleBook } from "@shared/types";

/**
 * Interface representing a DTO (Data Transfer Object) used to update an existing book.
 */
export interface UpdateBookDto {
  /**
   * Unique identifier of the book. (used for identification during update)
   */
  readonly id: number;

  /**
   * Title of the book. (can be updated)
   */
  readonly title: TitleBook;

  /**
   * Poster image URL of the book. (can be updated)
   */
  readonly poster: PosterBook;

  /**
   * Director of the book. (can be updated)
   */
  readonly director: AuthorBook;
}
