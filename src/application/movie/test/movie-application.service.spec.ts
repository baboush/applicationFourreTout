import { Test, TestingModule } from "@nestjs/testing";
import { MovieApplicationService } from "../movie-application.service";

const movies = [
  {
    id: 1,
    title: { name: "The Shawshank Redemption" },
    director: { name: "Frank Darabont" },
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDFkZTcwOTEtZDFjYi0zZmM4LWExMjE0LWVkYWU4ZjEwNWRjYzQzXkEyXkFJQzY< br>",
  },
  {
    id: 2,
    title: { name: "The Godfather" },
    director: { name: "Francis Ford Coppola" },
    poster:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmE2OTclXkZvA0NTE4ODQyEiQyYWVkZGU5YzY4NTY3ODY3NmRkYTاتهاGVjZGU4ZDg4MTY3NDBhZWE4ZWQzNmRiMGE3MGE3OWQ9ഏształ",
  },
  {
    id: 3,
    title: { name: "The Dark Knight" },
    director: { name: "Christopher Nolan" },
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTMGMTgwMTQwMi0yMmEtYWVkOC05MzYzOTc0N2VlMjEzXkEyXkFJQzY< br>",
  },
  {
    id: 4,
    title: { name: "The Lord of the Rings: The Return of the King" },
    director: { name: "Peter Jackson" },
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzA4ZGFjMjEtMmE2Ni0zYzRiLWViZWUtMTUzZTU5MmE3EGY0XkEyXkFJQzY< br>",
  },
];
export class MockMovieRepository {}
describe("MovieApplicationService", () => {
  let service: MovieApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieApplicationService],
    }).compile();

    service = module.get<MovieApplicationService>(MovieApplicationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
