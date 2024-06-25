import { Injectable } from "@nestjs/common";
import { ReadBookApplicationDto } from "../dto";
import { BooksApplicationService } from "../books-application.service";

/**
 * Injectable use case implementation for reading a movie by ID.
 * This use case interacts with the BookApplicationService to retrieve a single movie.
 */
@Injectable()
export class ReadBookUsecaseApplication  {
  constructor(private readonly movieService: BooksApplicationService) {}

  /**
   * @inheritdoc.ReadBookUsecase.execute
   */
  async execute(id: number): Promise<ReadBookApplicationDto> {
    return await this.movieService.findOneSavedBook(id);
  }
}
