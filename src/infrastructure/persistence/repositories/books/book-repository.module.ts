import { BookEntity } from '@domain/books';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepositoryPersistence } from './book-repository-persistence';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  providers: [BookRepositoryPersistence],
  exports: [BookRepositoryPersistence]
})
export class BookRepositoryModule {}
