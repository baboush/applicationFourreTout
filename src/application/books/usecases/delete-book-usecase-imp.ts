import { Injectable } from "@nestjs/common";
import { BooksServiceImp } from "../books.service";

/**
 * Injectable use case implementation for deleting a movie.
 * This use case interacts with the BookApplicationService to delete a movie by its ID.
 */
@Injectable()
export class DeleteBookUsecaseImp  {
  constructor(private readonly movieService: BooksServiceImp) {}

  /**
   * @inheritdoc DeleteBookUsecase.execute
   */
  async execute(id: number): Promise<boolean> {
    return await this.movieService.deleteSavedBook(id);
  }
}
