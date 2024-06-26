import { Module, forwardRef } from '@nestjs/common';
import { BookRepositoryModule } from '@infrastructure/persistence/repositories/books/book-repository.module';
import { BooksControllerImp } from './books.controller';
import { BooksServiceImp } from './books.service';
import {
  CreateBookUsecaseImp,
  UpdateBookUsecaseImp,
  DeleteBookUsecaseImp,
  FindAllBooksUsecaseImp,
  ReadBookUsecaseImp,
} from './usecases';

@Module({
  imports: [forwardRef (() => BookRepositoryModule)],
  controllers: [BooksControllerImp],
  providers: [
    BooksServiceImp,
    CreateBookUsecaseImp,
    UpdateBookUsecaseImp,
    DeleteBookUsecaseImp,
    FindAllBooksUsecaseImp,
    ReadBookUsecaseImp
  ]
})
export class BookModule {}
