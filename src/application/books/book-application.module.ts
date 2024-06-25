import { Module, forwardRef } from '@nestjs/common';
import { BooksApplicationService } from './books-application.service';
import { BooksApplicationController } from './books-application.controller';
import { CreateBookUsecaseApplication,DeleteBookUsecaseApplication, ReadBookUsecaseApplication, UpdateBookUsecaseApplication } from './usecases';
import { FindAllBooksUsecaseApplication } from './usecases/find-all-books-application-usecase';
import { BookRepositoryModule } from '@infrastructure/persistence/repositories/books/book-repository.module';

@Module({
  imports: [forwardRef (() => BookRepositoryModule)],
  controllers: [BooksApplicationController],
  providers: [
    BooksApplicationService,
    CreateBookUsecaseApplication,
    UpdateBookUsecaseApplication,
    DeleteBookUsecaseApplication,
    FindAllBooksUsecaseApplication,
    ReadBookUsecaseApplication
  ]
})
export class BookApplicationModule {}
