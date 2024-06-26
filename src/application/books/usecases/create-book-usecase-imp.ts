import { Injectable } from "@nestjs/common";
import { BooksServiceImp } from "../books.service";
import { CreateBookDtoImp } from "../dto";

/**
 * Injectable use case implementation of the CreateBookUsecase interface.
 * This use case orchestrates the creation and publishing of a new Book through the BookApplicationService.
 */
@Injectable()
export class CreateBookUsecaseImp {
  constructor(private readonly bookService: BooksServiceImp) {}

  /**
   * @inheritdoc CreateBookUsecase.execute
   */
  async execute(
    createBook: CreateBookDtoImp,
  ): Promise<Partial<CreateBookDtoImp>> {
    return await this.bookService.createAndPublishBook(createBook);
  }
}
