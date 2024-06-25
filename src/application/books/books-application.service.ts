import { BookService } from '@domain/books/book-service.interface';
import { BookRepositoryPersistence } from '@infrastructure/persistence/repositories/books/book-repository-persistence';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookApplicationDto, ReadBookApplicationDto, UpdateBookApplicationDto } from './dto';

@Injectable()
export class BooksApplicationService implements BookService {
  constructor(
    private readonly bookRepository: BookRepositoryPersistence
  ) {
  }

  /**
   * @inheritdoc bookService.createAndPublishbook
   */
  async createAndPublishBook(
    createBook: CreateBookApplicationDto,
  ): Promise<Partial<CreateBookApplicationDto>> {

    if (!createBook || Object.keys(createBook).length === 0)
      throw new BadRequestException(`Missing data for book creation`);

    return await this.bookRepository.createBook(createBook);
  }

  /**
   * @inheritdoc bookService.findSavedbooksList
   */
  async findSavedBooksList(): Promise<ReadBookApplicationDto[]> {
    const books = await this.bookRepository.findAllBook();

    if (!books)
      throw new NotFoundException(`No books found in database`);

    return books;
  }

  /**
   * @inheritdoc bookService.findOneSavedbook
   */
  async findOneSavedBook(id: number): Promise<ReadBookApplicationDto> {
    const book: ReadBookApplicationDto =
      await this.bookRepository.findOneBook(id);

    if (!book)
      throw new NotFoundException(`book with ${id} not exist in database`);

    return book;
  }

  /**
   * @inheritdoc bookService.updatebookDetail
   */
  async updateBookDetail(
    updateBook: UpdateBookApplicationDto
  ): Promise<Partial<ReadBookApplicationDto>> {
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
