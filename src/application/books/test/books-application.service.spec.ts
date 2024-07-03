import { Test, TestingModule } from '@nestjs/testing';
import { BooksApplicationService } from '../books-application.service';
import { BookRepositoryPersistence } from '@infrastructure/persistence/repositories/books/book-repository-persistence';
import { CreateBookApplicationDto } from '../dto/create-book-application.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BookEntity } from '@domain/books';
import { ReadBookApplicationDto } from '../dto/read-book-application.dto';
import { UpdateBookDto } from '@domain/books/dto/update-book-dto.interface';

describe('BooksApplicationService', () => {
  let service: BooksApplicationService;
  let repo: BookRepositoryPersistence;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksApplicationService,
        {
          provide: BookRepositoryPersistence,
          useValue: {
            createBook: jest.fn(),
            findAllBook: jest.fn(),
            findOneBook: jest.fn(),
            updateBook: jest.fn(),
            deleteBook: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksApplicationService>(BooksApplicationService);
    repo = module.get<BookRepositoryPersistence>(BookRepositoryPersistence);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAndPublishBook', () => {
    it('should throw BadRequestException if book data is invalid', async () => {
      const book: CreateBookApplicationDto = {} as any;
      await expect(service.createAndPublishBook(book)).rejects.toThrow(BadRequestException);
    });

    it('should create a book if data is valid', async () => {
      const book: CreateBookApplicationDto = { 
        title: 'The Shawshank Redemption',
        poster: 'https://example.com/poster.jpg',
        author: 'Frank Darabont',
      } as any;
      const createdBook = { 
        title: 'The Shawshank Redemption',
        poster: 'https://example.com/poster.jpg',
        author: 'Frank Darabont',
      } as any;
      jest.spyOn(repo, 'createBook').mockResolvedValueOnce(createdBook);
      await expect(service.createAndPublishBook(book)).resolves.toEqual(createdBook);
    });

    describe('findSavedBooksList', () => {
       it('should throw NotFoundException if books does not exist', async () => {
        jest.spyOn(repo, 'findAllBook').mockResolvedValueOnce(undefined);
        await expect(service.findSavedBooksList()).rejects.toThrow(NotFoundException);
      });

      it('should return a list of books', async () => {
        const books: BookEntity[] = [
          {
            id: 1,
            title: 'The Shawshank Redemption',
            author: 'Frank Darabont',
            poster: 'gfdgdfgdfg'
          },
          {
            id: 2,
            title: 'The Godfather',
            author: 'Francis Ford Coppola',
            poster: 'fsdfsdfsdfsdf'
          } as any];
        jest.spyOn(repo, 'findAllBook').mockResolvedValueOnce(books);
        await expect(service.findSavedBooksList()).resolves.toEqual(books);
      });
    });

    describe('findOneSavedBook', () => {
      it('should throw NotFoundException if book does not exist', async () => {
        const id = 1;
        jest.spyOn(repo, 'findOneBook').mockResolvedValueOnce(undefined);
        await expect(service.findOneSavedBook(id)).rejects.toThrow(NotFoundException);
      });

      it('should return a book if it exists', async () => {
        const id = 1;
        const book: ReadBookApplicationDto = { 
          id: 1,
          title: "Dalut",
          author: 'testset',
          director: 'sdfgjdklfgjdfklg',
        } as any;
        jest.spyOn(repo, 'findOneBook').mockResolvedValueOnce(book);
        await expect(service.findOneSavedBook(id)).resolves.toEqual(book);
      });
    });

    describe('updateBookDetail', () => {
      it('should throw NotFoundException if book id is not provided', async () => {
        const book: UpdateBookDto = {} as any;
        await expect(service.updateBookDetail(book)).rejects.toThrow(NotFoundException);
      });

      it('should update a book if data is valid', async () => {
        const book: UpdateBookDto = { 
          id: 1, titre: 'test', poster:'test', director:'test'
        } as any;
        const updatedBook = { id: 1, titre: 'test2', poster:'test2', director:'test2'  } as any;
        jest.spyOn(repo, 'updateBook').mockResolvedValueOnce(updatedBook);
        await expect(service.updateBookDetail(book)).resolves.toEqual(updatedBook);
      });
    });

    describe('deleteSavedBook', () => {
      it('should throw NotFoundException if book does not exist', async () => {
        const id = 1;
        jest.spyOn(repo, 'deleteBook').mockResolvedValueOnce(false);
        await expect(service.deleteSavedBook(id)).rejects.toThrow(NotFoundException);
      });

      it('should delete a book if it exists', async () => {
        const id = 1;
        jest.spyOn(repo, 'deleteBook').mockResolvedValueOnce(true);
        await expect(service.deleteSavedBook(id)).resolves.toEqual(true);
      });
    });
  });

});
