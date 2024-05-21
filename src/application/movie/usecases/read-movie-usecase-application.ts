import { Movie, ReadMovieUsecase } from "@domain/movies";
import { MovieApplicationService } from "../movie-application.service";
import { Injectable } from "@nestjs/common";

/**
 * Injectable use case implementation for reading a movie by ID.
 * This use case interacts with the MovieApplicationService to retrieve a single movie.
 */
@Injectable()
export class ReadMovieUsecaseApplication implements ReadMovieUsecase {
  constructor(private readonly movieService: MovieApplicationService) {}

  /**
   * @inheritdoc.ReadMovieUsecase.execute
   */
  async execute(id: number): Promise<Movie> {
    return await this.movieService.findOneSavedMovie(id);
  }
}
