import { Module, forwardRef } from "@nestjs/common";
import { BookRepositoryModule } from "@infrastructure/persistence/repositories/books/book-repository.module";
import { BooksControllerImp } from "./books.controller";
import { BooksServiceImp } from "./books.service";

@Module({
  imports: [forwardRef(() => BookRepositoryModule)],
  controllers: [BooksControllerImp],
  providers: [BooksServiceImp],
})
export class BookModule {}
