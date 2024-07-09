import { Test, TestingModule } from "@nestjs/testing";
import { BookRepositoryPersistence } from "@infrastructure/persistence/repositories/books/book-repository-persistence";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { BookEntity } from "@domain/books";
import { UpdateBookDto } from "@domain/books/dto/update-book-dto.interface";
import { BooksServiceImp } from "../books.service";
import { CreateBookDtoImp, ReadBookDtoImp } from "../dto";

describe("BooksApplicationService", () => {
  let service: BooksServiceImp;
  let repo: BookRepositoryPersistence;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksServiceImp,
        {
          provide: BookRepositoryPersistence,
          useValue: {
            createEntity: jest.fn(),
            findAllEntities: jest.fn(),
            findOneEntity: jest.fn(),
            updateEntity: jest.fn(),
            deleteEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksServiceImp>(BooksServiceImp);
    repo = module.get<BookRepositoryPersistence>(BookRepositoryPersistence);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createAndPublishBook", () => {
    it("should throw BadRequestException if book data is invalid", async () => {
      const book: CreateBookDtoImp = {} as any;
      jest
        .spyOn(repo, "createEntity")
        .mockRejectedValueOnce(new BadRequestException());
      await expect(service.createAndPublishBook(book)).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should create a book if data is valid", async () => {
      const book: CreateBookDtoImp = {
        title: "The Shawshank Redemption",
        poster: "https://example.com/poster.jpg",
        author: "Frank Darabont",
      } as any;
      const createdBook = {
        title: "The Shawshank Redemption",
        poster: "https://example.com/poster.jpg",
        author: "Frank Darabont",
      } as any;
      jest.spyOn(repo, "createEntity").mockResolvedValueOnce(createdBook);
      await expect(service.createAndPublishBook(book)).resolves.toEqual(
        createdBook,
      );
    });

    describe("findSavedBooksList", () => {
      it("should throw NotFoundException if books does not exist", async () => {
        jest
          .spyOn(repo, "findAllEntities")
          .mockRejectedValueOnce(new NotFoundException());
        await expect(service.findSavedBooksList()).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should return a list of books", async () => {
        const books: BookEntity[] = [
          {
            id: 1,
            title: "The Shawshank Redemption",
            author: "Frank Darabont",
            poster: "gfdgdfgdfg",
          },
          {
            id: 2,
            title: "The Godfather",
            author: "Francis Ford Coppola",
            poster: "fsdfsdfsdfsdf",
          } as any,
        ];
        jest.spyOn(repo, "findAllEntities").mockResolvedValueOnce(books);
        await expect(service.findSavedBooksList()).resolves.toEqual(books);
      });
    });

    describe("findOneSavedBook", () => {
      it("should throw NotFoundException if book does not exist", async () => {
        const id = 1;
        jest
          .spyOn(repo, "findOneEntity")
          .mockRejectedValueOnce(new NotFoundException());
        await expect(service.findOneSavedBook(id)).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should return a book if it exists", async () => {
        const id = 1;
        const book = {
          id: 1,
          title: "Dalut",
          author: "testset",
          director: "sdfgjdklfgjdfklg",
        } as any;
        jest.spyOn(repo, "findOneEntity").mockResolvedValueOnce(book);
        await expect(service.findOneSavedBook(id)).resolves.toEqual(book);
      });
    });

    describe("updateEntityDetail", () => {
      it("should throw NotFoundException if book id is not provided", async () => {
        const book: UpdateBookDto = {} as any;
        jest
          .spyOn(repo, "updateEntity")
          .mockRejectedValueOnce(new NotFoundException());
        await expect(service.updateBookDetail(book)).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should throw BadRequestException if book has not valid schema", async () => {
        const book: UpdateBookDto = {
          id: 1,
          title: "re",
          poster: "re",
          author: "",
        } as any;
        jest
          .spyOn(repo, "updateEntity")
          .mockRejectedValueOnce(new BadRequestException());
        await expect(service.updateBookDetail(book)).rejects.toThrow(
          BadRequestException,
        );
      });

      it("should update a book if data is valid", async () => {
        const id = 1;
        const book = {
          id: 1,
          title: "test",
          poster: "test",
          author: "test",
        } as any;
        const updatedBook = {
          id: 1,
          titre: "test2",
          poster: "test2",
          author: "test2",
        } as any;
        jest.spyOn(repo, "findOneEntity").mockResolvedValueOnce(book);
        jest.spyOn(repo, "updateEntity").mockResolvedValueOnce(updatedBook);
        await expect(service.updateBookDetail(book)).resolves.toEqual(
          updatedBook,
        );
      });
    });

    describe("deleteSavedBook", () => {
      it("should throw NotFoundException if book does not exist", async () => {
        const id = 1;
        jest
          .spyOn(repo, "deleteEntity")
          .mockRejectedValueOnce(new NotFoundException());
        await expect(service.deleteSavedBook(id)).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should delete a book if it exists", async () => {
        const book = {
          id: 1,
          title: "Dalut",
          author: "testset",
          director: "sdfgjdklfgjdfklg",
        } as any;

        jest.spyOn(repo, "findOneEntity").mockResolvedValueOnce(book);
        jest.spyOn(repo, "deleteEntity").mockResolvedValueOnce(true);
        await expect(service.deleteSavedBook(book.id)).resolves.toEqual(true);
      });
    });
  });
});
