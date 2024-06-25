import { BookDto, CreateBookDto, UpdateBookDto } from "./dto";

/**
 * Interface representing a book service for managing book data in the application.
 * This service likely interacts with a book repository for data persistence.
 */
export interface BookService {
  /**
   * Creates and publishes a new book.
   *
   * @param createBook A DTO containing data for the new book.
   * @returns A Promise that resolves to a partially populated Book object
   *          representing the created book, or rejects with an error if creation fails.
   */
  createAndPublishBook(createBook: CreateBookDto): Promise<Partial<BookDto>>;

  /**
   * Retrieves a paginated list of saved books.
   *
   * @returns A Promise that resolves to a list of BookEntity objects,
   *          or rejects with an error if retrieval fails.
   */
  findSavedBooksList(): Promise<BookDto[]>;

  /**
   * Finds a single saved book by its ID.
   *
   * @param id The unique identifier of the book to retrieve.
   * @returns A Promise that resolves to a complete Book object,
   *          or rejects with an error if retrieval fails.
   */
  findOneSavedBook(id: number): Promise<BookDto>;

  /**
   * Updates the details of a saved book.
   *
   * @param updateBook A DTO containing data for updating the book.
   * @returns A Promise that resolves to a partially populated Book object
   *          reflecting the update, or rejects with an error if the update fails.
   */
  updateBookDetail(updateBook: UpdateBookDto): Promise<Partial<BookDto>>;

  /**
   * Deletes a saved book by its ID.
   *
   * @param id The unique identifier of the book to delete.
   * @returns A Promise that resolves to true if the deletion is successful,
   *          or false otherwise (likely with an error message).
   */
  deleteSavedBook(id: number): Promise<boolean>;
}
