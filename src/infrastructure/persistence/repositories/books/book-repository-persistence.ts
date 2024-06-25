import { BookEntity } from "@domain/books";
import { BookRepository } from "@domain/books/book-repository.interface";
import { BookDto } from "@domain/books/dto/book-dto.interface";
import { CreateBookDto } from "@domain/books/dto/create-book-dto.interface";
import { UpdateBookDto } from "@domain/books/dto/update-book-dto.interface";
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
   * @inheritdoc bookRepository.createBook
   */
  async createBook(createbook: CreateBookDto): Promise<BookDto> {

    if (!createbook)
      throw new BadRequestException(`book data is Invalid`);

    const existingbook = await this.booksRepository.findBy({
      title: createbook.title,
      author: createbook.author,
      poster: createbook.poster,
    });

    if (existingbook)
      throw new BadRequestException(`book exist in database`);

    return await this.booksRepository.save(createbook);
  }

  /**
   * @inheritdoc bookRepository.findAllBook
   */
  async findAllBook(): Promise<BookDto[]> {
    return await this.booksRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.categories", "categories")
      .getMany();
  }

  /**
   * @inheritdoc bookRepository.findOneBook
   */
  async findOneBook(id: number): Promise<BookDto> {
    const book = await this.booksRepository.findOneBy({ id: id });

    if (!book)
      throw new NotFoundException(`book with ${id} not found`);

    return book;
  }

  /**
   * @inheritdoc bookRepository.updateBook
   */
  async updateBook(
    id: number,
    updatebook: UpdateBookDto,
  ): Promise<Partial<BookDto>> {

    if (!updatebook || !id)
      throw new BadRequestException(`Update book data is invalid`);

    const updatedbook = await this.booksRepository.update(id, updatebook);

    if (updatedbook.affected === 0)
      throw new NotFoundException(`book Update ${id} not found`);
  
    console.log(updatedbook.raw);
    return updatedbook.raw
  }

  /**
   * @inheritdoc bookRepository.deleteBook
   */
  async deleteBook(id: number): Promise<boolean> {
    const deletebook = await this.booksRepository.delete(id);

    if (deletebook.affected === 0)
      throw new NotFoundException(`book width ${id} not found`);

    return deletebook.affected > 0;
  }
}
