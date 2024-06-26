import { ReadBookDto, CreateBookDto, UpdateBookDto } from "./dto";

/**
 * Interface representing a book repository for data access operations.
 * This repository defines methods for interacting with book data.
 */
export interface BookRepository {
  /**
   * Creates a new book in the data source.
   *
   * @param createBook A DTO containing data for the new book.
   * @returns A Promise that resolves to a complete Book object
   *          representing the created book, or rejects with an error if creation fails.
   */
  createBook(createBook: CreateBookDto): Promise<CreateBookDto>;

  /**
   *
   * @returns A Promise that resolves to a list of BookEntity objects,
   *          or rejects with an error if retrieval fails.
   */
  findAllBook(): Promise<ReadBookDto[]>;

  /**
   * Finds a single book by its ID from the data source.
   *
   * @param id The unique identifier of the book to retrieve.
   * @returns A Promise that resolves to a complete Book object,
   *          or rejects with an error if retrieval fails.
   */
  findOneBook(id: number): Promise<ReadBookDto>;

  /**
   * Updates the details of an existing book in the data source.
   *
   * @param id The unique identifier of the book to update.
   * @param updateBook A DTO containing data for updating the book.
   * @returns A Promise that resolves to a partially populated Book object
   *          reflecting the update, or rejects with an error if the update fails.
   */
  updateBook(id: number, updateBook: UpdateBookDto): Promise<Partial<UpdateBookDto>>;

  /**
   * Deletes a book from the data source based on its ID.
   *
   * @param id The unique identifier of the book to delete.
   * @returns A Promise that resolves to true if the deletion is successful,
   *          or false otherwise (likely with an error message).
   */
  deleteBook(id: number): Promise<boolean>;
}
