import { Injectable } from "@nestjs/common";
import { BooksApplicationService } from "../books-application.service";

/**
 * Injectable use case implementation for deleting a movie.
 * This use case interacts with the BookApplicationService to delete a movie by its ID.
 */
@Injectable()
export class DeleteBookUsecaseApplication  {
  constructor(private readonly movieService: BooksApplicationService) {}

  /**
   * @inheritdoc DeleteBookUsecase.execute
   */
  async execute(id: number): Promise<boolean> {
    return await this.movieService.deleteSavedBook(id);
  }
}
