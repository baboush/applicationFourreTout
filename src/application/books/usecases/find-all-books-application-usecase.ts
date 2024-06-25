import { Injectable } from "@nestjs/common";
import { BooksApplicationService } from "../books-application.service";
import { ReadBookApplicationDto } from "../dto";

/**
 * Injectable use case implementation of the FindAllBooksUsecase interface.
 */
@Injectable()
export class FindAllBooksUsecaseApplication {
  constructor(private readonly movieService: BooksApplicationService) {}

  /**
   * @inheritdoc.FindAllBooksUsecase.execute
   */
  async execute(): Promise<ReadBookApplicationDto[]> {
    return await this.movieService.findSavedBooksList();
  }
}
