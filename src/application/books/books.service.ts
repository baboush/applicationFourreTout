import { AbstractGeneralService } from "@application/generics/general";
import { BookEntity, BookService } from "@domain/books";
import { Injectable } from "@nestjs/common";
import { CreateBookDtoImp, ReadBookDtoImp, UpdateBookDtoImp } from "./dto";
import { BookRepositoryPersistence } from "@infrastructure/persistence/repositories/books/book-repository-persistence";

@Injectable()
export class BooksServiceImp
  extends AbstractGeneralService<BookEntity>
  implements BookService
{
  constructor(private readonly bookRepository: BookRepositoryPersistence) {
    super(bookRepository);
  }

  /**
   * @inheritdoc bookService.createAndPublishbook
   */
  async createAndPublishBook(
    createBook: CreateBookDtoImp,
  ): Promise<Partial<CreateBookDtoImp>> {
    return await super.createEntity(createBook);
  }

  /**
   * @inheritdoc bookService.findSavedbooksList
   */
  async findSavedBooksList(): Promise<ReadBookDtoImp[]> {
    return await super.findAllEntities("book", "categories");
  }

  /**
   * @inheritdoc bookService.findOneSavedbook
   */
  async findOneSavedBook(id: number): Promise<ReadBookDtoImp> {
    return await super.findOneEntity(id);
  }

  /**
   * @inheritdoc bookService.updatebookDetail
   */
  async updateBookDetail(
    updateBook: UpdateBookDtoImp,
  ): Promise<Partial<UpdateBookDtoImp>> {
    return super.updateEntity(updateBook.id, updateBook);
  }

  /**
   * @inheritdoc bookService.deleteSavedbook
   */
  async deleteSavedBook(id: number): Promise<boolean> {
    return await super.deleteEntity(id);
  }
}
