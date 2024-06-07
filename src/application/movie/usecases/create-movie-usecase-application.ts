import { CreateMovieDto, CreateMovieUsecase, Movie } from "@domain/movies";
import { MovieApplicationService } from "../movie-application.service";
import { Injectable } from "@nestjs/common";
import { CreateMovieApplicationDto } from "../dto";

/**
 * Injectable use case implementation of the CreateMovieUsecase interface.
 * This use case orchestrates the creation and publishing of a new movie through the MovieApplicationService.
 */
@Injectable()
export class CreateMoviesUsecaseApplication implements CreateMovieUsecase {
  constructor(private readonly movieService: MovieApplicationService) {}

  /**
   * @inheritdoc CreateMovieUsecase.execute
   */
  async execute(
    createMovie: CreateMovieApplicationDto,
  ): Promise<Partial<Movie>> {
    return await this.movieService.createAndPublishMovie(createMovie);
  }
}
