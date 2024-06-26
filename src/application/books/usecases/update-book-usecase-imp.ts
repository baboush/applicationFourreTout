import { Injectable } from "@nestjs/common";
import {  UpdateBookDtoImp } from "../dto";
import { BooksServiceImp } from "../books.service";

/**
 * Injectable use case implementation of the UpdateBookUsecase interface.
 * This use case interacts with the BookApplicationService to update the details of a movie.
 */
@Injectable()
export class UpdateBookUsecaseImp {
  constructor(private readonly movieService: BooksServiceImp) {}
  /**
   * @inheritdoc UpdateBookUsecase.execute
   */
  async execute(
    updateBook: UpdateBookDtoImp,
  ): Promise<Partial<UpdateBookDtoImp>> {
    return this.movieService.updateBookDetail(updateBook);
  }
}
