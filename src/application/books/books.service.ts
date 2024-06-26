import { BookService } from '@domain/books/book-service.interface';
import { BookRepositoryPersistence } from '@infrastructure/persistence/repositories/books/book-repository-persistence';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDtoImp, ReadBookDtoImp, UpdateBookDtoImp } from './dto';

@Injectable()
export class BooksServiceImp implements BookService {
  constructor(
    private readonly bookRepository: BookRepositoryPersistence
  ) { }

  /**
   * @inheritdoc bookService.createAndPublishbook
   */
  async createAndPublishBook(
    createBook: CreateBookDtoImp,
  ): Promise<Partial<CreateBookDtoImp>> {

    if (!createBook || Object.keys(createBook).length === 0)
      throw new BadRequestException(`Missing data for book creation`);

    return await this.bookRepository.createBook(createBook);
  }

  /**
   * @inheritdoc bookService.findSavedbooksList
   */
  async findSavedBooksList(): Promise<ReadBookDtoImp[]> {
    const books = await this.bookRepository.findAllBook();

    if (!books)
      throw new NotFoundException(`No books found in database`);

    return books;
  }

  /**
   * @inheritdoc bookService.findOneSavedbook
   */
  async findOneSavedBook(id: number): Promise<ReadBookDtoImp> {
    const book: ReadBookDtoImp =
      await this.bookRepository.findOneBook(id);

    if (!book)
      throw new NotFoundException(`book with ${id} not exist in database`);

    return book;
  }

  /**
   * @inheritdoc bookService.updatebookDetail
   */
  async updateBookDetail(
    updateBook: UpdateBookDtoImp
  ): Promise<Partial<UpdateBookDtoImp>> {
    const book = await this.bookRepository.findOneBook(updateBook.id);

    if (!book.id)
      throw new NotFoundException(`book width ID ${book.id} not found`);

    if (!updateBook || Object.keys(updateBook).length === 0)
      throw new BadRequestException(`${updateBook} Missing data`);

    return await this.bookRepository.updateBook(
      updateBook.id,
      updateBook,
    );
  }

  /**
   * @inheritdoc bookService.deleteSavedbook
   */
  async deleteSavedBook(id: number): Promise<boolean> {

    const book = await this.bookRepository.findOneBook(id);

    if (!book)
      throw new NotFoundException(`book with ID ${id} not found`);

    const isDeleted = await this.bookRepository.deleteBook(id);

    if (!isDeleted)
      throw new BadRequestException(`Failed delete book with ID: ${id} `)

    return isDeleted;
  }

}
