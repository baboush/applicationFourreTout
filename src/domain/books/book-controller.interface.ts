import { BookDto, CreateBookDto, UpdateBookDto } from "./dto";

/**
 * Interface representing a book controller in the Angular application.
 * This controller handles interactions related to book data.
 */
export interface BookController {
  /**
   * Handles the logic for creating and publishing a new book.
   *
   * @param createBook A DTO containing data for the new book.
   * @returns A Promise that resolves to a partially populated Book object
   *          representing the created book, or rejects with an error if creation fails.
   */
  handleCreateAndPublishBook(
    createBook: CreateBookDto,
  ): Promise<Partial<BookDto>>;

  /**
   * Handles the logic for finding a list of saved books with pagination.
   *
   * @returns A Promise that resolves to a  list of BookEntity objects,
   *          or rejects with an error if retrieval fails.
   */
  handleFindSavedBooksList(): Promise<BookDto[]>;

  /**
   * Handles the logic for finding a single saved book by its ID.
   *
   * @param id The unique identifier of the book to retrieve.
   * @returns A Promise that resolves to a complete Book object,
   *          or rejects with an error if retrieval fails.
   */
  handleFindOneSavedBook(id: number): Promise<Partial<BookDto>>;

  /**
   * Handles the logic for updating the details of a saved book.
   *
   * @param updateBook A DTO containing data for updating the book.
   * @returns A Promise that resolves to a partially populated Book object
   *          reflecting the update, or rejects with an error if the update fails.
   */
  handleUpdateBookDetail(
    updateBook: UpdateBookDto,
  ): Promise<Partial<BookDto>>;

  /**
   * Handles the logic for deleting a saved book by its ID.
   *
   * @param id The unique identifier of the book to delete.
   * @returns A Promise that resolves to true if the deletion is successful,
   *          or false otherwise (likely with an error message).
   */
  handleDeleteSavedBook(id: number): Promise<boolean>;
}
