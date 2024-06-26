import { Injectable } from "@nestjs/common";
import { BooksServiceImp } from "../books.service";
import { ReadBookDtoImp } from "../dto";

/**
 * Injectable use case implementation for reading a movie by ID.
 * This use case interacts with the BookApplicationService to retrieve a single movie.
 */
@Injectable()
export class ReadBookUsecaseImp  {
  constructor(private readonly movieService: BooksServiceImp) {}

  /**
   * @inheritdoc.ReadBookUsecase.execute
   */
  async execute(id: number): Promise<ReadBookDtoImp> {
    return await this.movieService.findOneSavedBook(id);
  }
}
