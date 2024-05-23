import { Test, TestingModule } from "@nestjs/testing";
import { MovieApplicationService } from "../movie-application.service";
import { CreateMovieDtoApplication } from "../dto/create-movie-dto-application";
import { UpdateMovieDtoApplication } from "../dto/update-movie-dto-application";

describe("MovieApplicationService", () => {
  class MockMovieRepository {
    createMovie = jest
      .fn()
      .mockImplementation((movie: CreateMovieDtoApplication) => movie);
    findAllMovie = jest.fn().mockResolvedValue([]);
    findOneMovie = jest
      .fn()
      .mockImplementation((criteria: any) => Promise.resolve(null));
    updateMovie = jest
      .fn()
      .mockImplementation((id: number, updateData: UpdateMovieDtoApplication) =>
        Promise.resolve({ affected: [updateData] }),
      ); // Mock update behavior
    deleteMovie = jest.fn().mockResolvedValue(true);
  }

  let service: MovieApplicationService;
  let repository: MockMovieRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieApplicationService,
        {
          provide: MockMovieRepository,
          useClass: MockMovieRepository,
        },
      ],
    }).compile();

    service = module.get<MovieApplicationService>(MovieApplicationService);
    repository = module.get<MockMovieRepository>(MockMovieRepository);
  });

  it("should create a new movie (valid data)", async () => {
    const validMovieData: CreateMovieDtoApplication = {
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
