import { Injectable } from "@nestjs/common";
import { UpdateBookApplicationDto } from "../dto";
import { UpdateBookDto } from "@domain/books/dto";
import { BooksApplicationService } from "../books-application.service";

/**
 * Injectable use case implementation of the UpdateBookUsecase interface.
 * This use case interacts with the BookApplicationService to update the details of a movie.
 */
@Injectable()
export class UpdateBookUsecaseApplication   {
  constructor(private readonly movieService: BooksApplicationService) {}

  /**
   * @inheritdoc UpdateBookUsecase.execute
   */
  async execute(
    updateBook: UpdateBookApplicationDto,
  ): Promise<Partial<UpdateBookDto>> {
    return this.movieService.updateBookDetail(updateBook);
  }
}
