import { Injectable } from "@nestjs/common";
import { CreateBookApplicationDto } from "../dto";
import { BooksApplicationService } from "../books-application.service";

/**
 * Injectable use case implementation of the CreateBookUsecase interface.
 * This use case orchestrates the creation and publishing of a new Book through the BookApplicationService.
 */
@Injectable()
export class CreateBookUsecaseApplication   {
  constructor(private readonly BookService: BooksApplicationService) {}

  /**
   * @inheritdoc CreateBookUsecase.execute
   */
  async execute(
    createBook: CreateBookApplicationDto,
  ): Promise<Partial<CreateBookApplicationDto>> {
    return await this.BookService.createAndPublishBook(createBook);
  }
}
