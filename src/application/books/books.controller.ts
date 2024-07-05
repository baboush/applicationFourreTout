import { JwtGuard } from "@application/auth/jwt.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BookController, BookEntity } from "@domain/books";
import { CreateBookDtoImp, ReadBookDtoImp, UpdateBookDtoImp } from "./dto";
import { BooksServiceImp } from "./books.service";
import { AbstractGeneralController } from "@application/generics/general";

/**
 * Controller handling book application logic.
 * This controller interacts with injected use cases to manage book CRUD operations
 * and exposes them via API endpoints.
 * It's tagged with `@ApiTags('Book')` to group related API documentation.
 * It requires JWT authentication (`@UseGuards(JwtGuard)`) for all endpoints.
 */
@ApiTags("Book")
//@UseGuards(JwtGuard)
@Controller("book")
export class BooksControllerImp
  extends AbstractGeneralController<BookEntity>
  implements BookController
{
  constructor(private readonly bookService: BooksServiceImp) {
    super(bookService);
  }

  /**
   * @inheritdoc BookController.handleCreateAndPublishBook
   */
  @Post("create")
  async handleCreateAndPublishBook(
    @Body()
    createBook: CreateBookDtoImp,
  ): Promise<Partial<CreateBookDtoImp>> {
    return await super.createEntity(createBook);
  }

  /**
   * @inheritdoc BookController.handleFindSavedBooksListe
   */
  @Get("list")
  async handleFindSavedBooksList(): Promise<ReadBookDtoImp[]> {
    return await super.findAllEntities("book", "categories");
  }

  /**
   * @inheritdoc BookController.handleFindOneSavedBook
   */
  @Get(":id")
  async handleFindOneSavedBook(
    @Param("id") id: number,
  ): Promise<Partial<ReadBookDtoImp>> {
    return await super.findOneEntity(id);
  }

  /**
   * @inheritdoc BookController.handleUpdateBookDetail
   */
  @Put("update/:id")
  async handleUpdateBookDetail(
    @Body()
    updateBook: UpdateBookDtoImp,
  ): Promise<Partial<UpdateBookDtoImp>> {
    return await super.updateEntity(updateBook.id, updateBook);
  }

  /**
   * @inheritdoc BookController.handleDeleteSavedBook
   */
  @Delete("delete/:id")
  async handleDeleteSavedBook(@Param("id") id: number): Promise<boolean> {
    return super.deleteEntity(id);
  }
}
