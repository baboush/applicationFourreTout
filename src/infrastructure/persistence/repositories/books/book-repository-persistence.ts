import { BookEntity } from "@domain/books";
import { BookRepository } from "@domain/books/book-repository.interface";
import { CreateBookDto, ReadBookDto, UpdateBookDto } from "@domain/books/dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AbstractGeneralRepository } from "@infrastructure/persistence/repositories/generics/general";

@Injectable()
export class BookRepositoryPersistence
  extends AbstractGeneralRepository<BookEntity>
  implements BookRepository
{
  entityName = "book";
  constructor(
    @InjectRepository(BookEntity)
    private readonly booksRepository: Repository<BookEntity>,
  ) {
    super(booksRepository);
  }

  /**
   * @inheritdoc BookRepository.createBook
   */
  async createBook(createBook: CreateBookDto): Promise<CreateBookDto> {
    await super.createEntity(createBook);

    return {
      title: createBook.title,
      poster: createBook.poster,
      author: createBook.author,
    };
  }

  /**
   * @inheritdoc BookRepository.findAllBook
   */
  async findAllBook(): Promise<ReadBookDto[]> {
    return await super.findAllEntities("book", "categories");
  }

  /**
   * @inheritdoc BookRepository.findOneBook
   */
  async findOneBook(id: number): Promise<ReadBookDto> {
    return await this.booksRepository.findOneBy({ id: id });
  }

  /**
   * @inheritdoc BookRepository.updateBook
   */
  async updateBook(
    id: number,
    updateBook: UpdateBookDto,
  ): Promise<Partial<UpdateBookDto>> {
    return super.updateEntity(id, updateBook);
  }

  /**
   * @inheritdoc BookRepository.deleteBook
   */
  async deleteBook(id: number): Promise<boolean> {
    return await super.deleteEntity(id);
  }
}
