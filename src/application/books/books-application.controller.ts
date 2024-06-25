import { JwtGuard } from "@application/auth/jwt.guard";
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  CreateBookApplicationDto,
  ReadBookApplicationDto,
  UpdateBookApplicationDto,
} from "./dto";
import {
    CreateBookUsecaseApplication,
    UpdateBookUsecaseApplication,
    DeleteBookUsecaseApplication,
    FindAllBooksUsecaseApplication,
    ReadBookUsecaseApplication
} from "@application/books/usecases";
import { ApiTags } from "@nestjs/swagger";
import { BookController } from "@domain/books";

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
export class BooksApplicationController implements BookController {
  constructor(
    private readonly createBookUsecase: CreateBookUsecaseApplication,
    private readonly findAllBookUsecase: FindAllBooksUsecaseApplication,
    private readonly readOneBookUsecase: ReadBookUsecaseApplication,
    private readonly updateBookUsecase: UpdateBookUsecaseApplication,
    private readonly deleteBookUsecase: DeleteBookUsecaseApplication,
  ) {}

  /**
   * @inheritdoc BookController.handleCreateAndPublishBook
   */
  @Post("create")
  async handleCreateAndPublishBook(
    @Body()
    createBook: CreateBookApplicationDto,
  ): Promise<Partial<ReadBookApplicationDto>> {

    if (!createBook) {
      throw new BadRequestException(`Data is missing for create book`);
    }

    return await this.createBookUsecase.execute(createBook);
  }

  /**
   * @inheritdoc BookController.handleFindSavedBooksListe
   */
  @Get("list")
  async handleFindSavedBooksList(): Promise<ReadBookApplicationDto[]> {
    const books = await this.findAllBookUsecase.execute();

    if (!books) {
      throw new BadRequestException(`Books error fetching`);
    }

    return books;
  }

  /**
   * @inheritdoc BookController.handleFindOneSavedBook
   */
  @Get(":id")
  async handleFindOneSavedBook(
    @Param("id") id: number,
  ): Promise<Partial<ReadBookApplicationDto>> {
    const book: ReadBookApplicationDto =
      await this.readOneBookUsecase.execute(id);

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  /**
   * @inheritdoc BookController.handleUpdateBookDetail
   */
  @Put("update")
  async handleUpdateBookDetail(
    @Body()
    updateBook: UpdateBookApplicationDto,
  ): Promise<Partial<UpdateBookApplicationDto>> {


    if (!updateBook.id) {
      throw new NotFoundException(`Book with ID ${updateBook.id} not found`);
    }

    if (!updateBook) {
      throw new BadRequestException(`Book update ${updateBook} is invalid`);
    }

    return await this.updateBookUsecase.execute(updateBook);
  }

  /**
   * @inheritdoc BookController.handleDeleteSavedBook
   */
  @Delete("delete/:id")
  async handleDeleteSavedBook(@Param("id") id: number): Promise<boolean> {
    const isDelete = await this.deleteBookUsecase.execute(id);

    if (!isDelete) {
      throw new NotFoundException(`Book with ID ${id} not deleted`);
    }

    return !!isDelete;
  }
}
