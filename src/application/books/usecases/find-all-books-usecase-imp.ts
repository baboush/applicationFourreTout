import { Injectable } from "@nestjs/common";
import { ReadBookDtoImp } from "../dto";
import { BooksServiceImp } from "../books.service";

/**
 * Injectable use case implementation of the FindAllBooksUsecase interface.
 */
@Injectable()
export class FindAllBooksUsecaseImp {
  constructor(private readonly movieService: BooksServiceImp) {}

  /**
   * @inheritdoc.FindAllBooksUsecase.execute
   */
  async execute(): Promise<ReadBookDtoImp[]> {
    return await this.movieService.findSavedBooksList();
  }
}
