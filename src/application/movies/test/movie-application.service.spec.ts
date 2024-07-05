import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { MovieRepositoryPersistence } from "@infrastructure/persistence/repositories";
import { MovieServiceImp } from "../movie.service";
import { CreateMovieDtoImp } from "../dto";
import { UpdateMovieDto } from "@domain/movies";

describe("MovieApplicationService", () => {
  let service: MovieServiceImp;
  let repo: MovieRepositoryPersistence;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieServiceImp,
        {
          provide: MovieRepositoryPersistence,
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

    service = module.get<MovieServiceImp>(MovieServiceImp);
    repo = module.get<MovieRepositoryPersistence>(MovieRepositoryPersistence);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createAndPublishMovie", () => {
    it("should throw BadRequestException if movie data is invalid", async () => {
      const movie: CreateMovieDtoImp = {} as any;
      jest
        .spyOn(repo, "createEntity")
        .mockRejectedValueOnce(new BadRequestException());
      await expect(service.createAndPublishMovie(movie)).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should create a movie if data is valid", async () => {
      const movie: CreateMovieDtoImp = {
        title: "The Shawshank Redemption",
        poster: "https://example.com/poster.jpg",
        director: "Frank Darabont",
      } as any;
      const createdMovie = {
        title: "The Shawshank Redemption",
        poster: "https://example.com/poster.jpg",
        director: "Frank Darabont",
      } as any;
      jest.spyOn(repo, "createEntity").mockResolvedValueOnce(createdMovie);
      await expect(service.createAndPublishMovie(movie)).resolves.toEqual(
        createdMovie,
      );
    });

    describe("findSavedMoviesList", () => {
      it("should throw NotFoundException if movies does not exist", async () => {
        jest
          .spyOn(repo, "findAllEntities")
          .mockRejectedValueOnce(new NotFoundException());
        await expect(service.findSavedMoviesList()).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should return a list of movies", async () => {
        const movies = [
          {
            id: 1,
            title: "The Shawshank Redemption",
            director: "Frank Darabont",
            poster: "gfdgdfgdfg",
          },
          {
            id: 2,
            title: "The Godfather",
            director: "Francis Ford Coppola",
            poster: "fsdfsdfsdfsdf",
          } as any,
        ];
        jest.spyOn(repo, "findAllEntities").mockResolvedValueOnce(movies);
        await expect(service.findSavedMoviesList()).resolves.toEqual(movies);
      });
    });

    describe("findOneSavedMovie", () => {
      it("should throw NotFoundException if movie does not exist", async () => {
        const id = 1;
        jest
          .spyOn(repo, "findOneEntity")
          .mockRejectedValueOnce(
            new NotFoundException(`Entity with id ${id} not found`),
          );
        await expect(service.findOneSavedMovie(id)).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should return a movie if it exists", async () => {
        const id = 1;
        const movie = {
          id: 1,
          title: "Dalut",
          Poster: "testset",
          director: "sdfgjdklfgjdfklg",
        } as any;
        jest.spyOn(repo, "findOneEntity").mockResolvedValueOnce(movie);
        await expect(service.findOneSavedMovie(id)).resolves.toEqual(movie);
      });
    });

    describe("updateEntityDetail", () => {
      it("should throw NotFoundException if movie id is not exist", async () => {
        const movie: UpdateMovieDto = {} as any;
        jest
          .spyOn(repo, "updateEntity")
          .mockRejectedValueOnce(new NotFoundException());

        await expect(service.updateMovieDetail(movie)).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should throw NotFoundException if movie id is not exist", async () => {
        const movie: UpdateMovieDto = {
          id: 1,
          title: "tet",
          poster: "",
          director: "",
        } as any;
        jest
          .spyOn(repo, "updateEntity")
          .mockRejectedValueOnce(new BadRequestException());

        await expect(service.updateMovieDetail(movie)).rejects.toThrow(
          BadRequestException,
        );
      });

      it("should update a movie if data is valid", async () => {
        const movie = {
          id: 1,
          titre: "test",
          poster: "test",
          director: "test",
        } as any;
        const updatedMovie = {
          id: 1,
          titre: "test2",
          poster: "test2",
          director: "test2",
        } as any;

        jest.spyOn(repo, "findOneEntity").mockResolvedValueOnce(movie);
        jest.spyOn(repo, "updateEntity").mockResolvedValueOnce(updatedMovie);
        await expect(service.updateMovieDetail(movie)).resolves.toEqual(
          updatedMovie,
        );
      });
    });

    describe("deleteSavedMovie", () => {
      it("should throw NotFoundException if movie does not exist", async () => {
        const id = 1;
        jest
          .spyOn(repo, "deleteEntity")
          .mockRejectedValueOnce(
            new NotFoundException(`Entity with id ${id} not found`),
          );
        await expect(service.deleteSavedMovie(id)).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should delete a movie if it exists", async () => {
        const movie = {
          id: 1,
          titre: "test",
          poster: "test",
          director: "test",
        } as any;
        jest.spyOn(repo, "findOneEntity").mockResolvedValueOnce(movie);
        jest.spyOn(repo, "deleteEntity").mockResolvedValueOnce(true);
        await expect(service.deleteSavedMovie(movie.id)).resolves.toEqual(true);
      });
    });
  });
});
