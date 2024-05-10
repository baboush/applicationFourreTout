import { Test, TestingModule } from "@nestjs/testing";
import {
  CreateMovieDto,
  MovieRepository,
  UpdateMovieDto,
} from "@domain/movies";
import { MovieApplicationService } from "../movie-application.service";
import { MovieRepositoryPersistence } from "../../../infrastructure/persistence/repositories/movie/movie-repository-persistence";

describe("MovieApplicationService", () => {
  class MockMovieRepository implements MovieRepository {
    createMovie = jest
      .fn()
      .mockImplementation((movie: CreateMovieDto) => movie);
    findAllMovie = jest.fn().mockResolvedValue([]);
    findOneMovie = jest
      .fn()
      .mockImplementation((criteria: any) => Promise.resolve(null));
    updateMovie = jest
      .fn()
      .mockImplementation((id: number, updateData: UpdateMovieDto) =>
        Promise.resolve({ affected: [updateData] }),
      ); // Mock update behavior
    deleteMovie = jest.fn().mockResolvedValue(true);
  }

  let service: MovieApplicationService;
  let repository: MovieRepositoryPersistence;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieApplicationService,
        {
          provide: MovieRepositoryPersistence,
          useClass: MockMovieRepository,
        },
      ],
    }).compile();

    service = module.get<MovieApplicationService>(MovieApplicationService);
    repository = module.get<MovieRepositoryPersistence>(
      MovieRepositoryPersistence,
    );
  });

  it("should create a new movie (valid data)", async () => {
    const validMovieData: CreateMovieDto = {
      id: 4,
      title: "The Lord of the Rings: The Return of the King",
      director: "Peter Jackson",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNzA4ZGFjMjEtMmE2Ni0zYzRiLWViZWUtMTUzZTU5MmE3EGY0XkEyXkFJQzY< br>",
    };

    const createdMovie = await service.createAndPublishMovie(validMovieData);

    expect(createdMovie).toEqual(validMovieData);
    expect(repository.createMovie).toHaveBeenCalledWith(validMovieData);
  });
  it("should findAllMovies", async () => {
    const movies = [
      {
        id: 1,
        title: "The Shawshank Redemption",
        director: "Frank Darabont",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMDFkZTcwOTEtZDFjYi0zZmM4LWExMjE0LWVkYWU4ZjEwNWRjYzQzXkEyXkFJQzY< br>",
      },
      {
        id: 2,
        title: "The Godfather",
        director: "Francis Ford Coppola",
        poster:
          "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmE2OTclXkZvA0NTE4ODQyEiQyYWVkZGU5YzY4NTY3ODY3NmRkYTاتهاGVjZGU4ZDg4MTY3NDBhZWE4ZWQzNmRiMGE3MGE3OWQ9ഏształ",
      },
      {
        id: 3,
        title: "The Dark Knight",
        director: "Christopher Nolan",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTMGMTgwMTQwMi0yMmEtYWVkOC05MzYzOTc0N2VlMjEzXkEyXkFJQzY< br>",
      },
    ];
    const findSavedMoviesList = await service.findSavedMoviesList();

    expect(findSavedMoviesList).toEqual(movies);
    expect(repository.findAllMovie).toHaveBeenCalledWith();
  });

  it("should findOneMovie", async () => {
    const movie = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMDFkZTcwOTEtZDFjYi0zZmM4LWExMjE0LWVkYWU4ZjEwNWRjYzQzXkEyXkFJQzY< br>",
    };
    const finOneSavedMovie = await service.findOneSavedMovie(movie.id);

    expect(finOneSavedMovie).toEqual(movie);
    expect(repository.findOneMovie).toHaveBeenCalledWith();
  });

  it("should UpdateMovie", async () => {
    const movieUpdate = {
      id: 2,
      title: "The Shawshank Redemption",
      director: "Frank Darabont Avec Michale",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMDFkZTcwOTEtZDFjYi0zZmM4LWExMjE0LWVkYWU4ZjEwNWRjYzQzXkEyXkFJQzY< br>",
    };
    const updateMovieDetail = await service.updateMovieDetail(movieUpdate);

    expect(updateMovieDetail).toEqual(movieUpdate);
    expect(repository.updateMovie).toHaveBeenCalledWith(movieUpdate);
  });

  it("deleteMovie", async () => {
    const movie = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMDFkZTcwOTEtZDFjYi0zZmM4LWExMjE0LWVkYWU4ZjEwNWRjYzQzXkEyXkFJQzY< br>",
    };
    const finOneSavedMovie = await service.findOneSavedMovie(movie.id);

    expect(finOneSavedMovie).toEqual(movie);
    expect(repository.findOneMovie).toHaveBeenCalledWith();
  });

  it("should UpdateDelete", async () => {
    const movieDelete = {
      id: 2,
      title: "The Shawshank Redemption",
      director: "Frank Darabont Avec Michale",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMDFkZTcwOTEtZDFjYi0zZmM4LWExMjE0LWVkYWU4ZjEwNWRjYzQzXkEyXkFJQzY< br>",
    };
    const updateMovieDetail = await service.deleteSavedMovie(movieDelete.id);

    expect(updateMovieDetail).toEqual(true);
    expect(repository.updateMovie).toHaveBeenCalledWith();
  });
});
