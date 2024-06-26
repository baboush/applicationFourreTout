import { BookEntity } from "@domain/books";
import { BookRepository } from "@domain/books/book-repository.interface";
import { CreateBookDto, ReadBookDto, UpdateBookDto } from "@domain/books/dto";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BookRepositoryPersistence implements BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly booksRepository: Repository<BookEntity>,
  ) {}

   /**
   * @inheritdoc BookRepository.createBook
   */
  async createBook(createBook: CreateBookDto): Promise<CreateBookDto> {

    if (!createBook)
      throw new BadRequestException(`Book data is Invalid`);

    const existingBook = await this.booksRepository.findBy({
      title: createBook.title,
      author: createBook.author,
      poster: createBook.poster,
    });

    if (existingBook && existingBook.length > 0)
      throw new BadRequestException(`Book exist in database`);

    return await this.booksRepository.save(createBook)
  }

  /**
   * @inheritdoc BookRepository.findAllBook
   */
  async findAllBook(): Promise<ReadBookDto[]> {
    const books = await this.booksRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.categories", "categories")
      .getMany();

    if(!books)
      throw new NotFoundException(`Books not found`);

    return books;
  }

  /**
   * @inheritdoc BookRepository.findOneBook
   */
  async findOneBook(id: number): Promise<ReadBookDto> {
    const book = await this.booksRepository.findOneBy({ id: id });

    if (!book)
      throw new NotFoundException(`Book with ${id} not found`);

    return book;
  }

  /**
   * @inheritdoc BookRepository.updateBook
   */
  async updateBook(
    id: number,
    updateBook: UpdateBookDto,
  ): Promise<Partial<UpdateBookDto>> {

    if (!updateBook || !id)
      throw new BadRequestException(`Update Book data is invalid`);

    const updatedBook = await this.booksRepository.update(id, updateBook);

    if (updatedBook.affected === 0)
      throw new NotFoundException(`Book Update ${id} not found`);
  
    console.log(updatedBook.raw);
    return updatedBook.raw
  }

  /**
   * @inheritdoc BookRepository.deleteBook
   */
  async deleteBook(id: number): Promise<boolean> {
    const deleteBook = await this.booksRepository.delete(id);

    if (deleteBook.affected === 0)
      throw new NotFoundException(`Book width ${id} not found`);

    return deleteBook.affected > 0;
  }
}
