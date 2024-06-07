import { Movie, UpdateMovieUsecase } from "@domain/movies";
import { Injectable } from "@nestjs/common";
import { MovieApplicationService } from "../movie-application.service";
import { UpdateMovieApplicationDto } from "../dto";

/**
 * Injectable use case implementation of the UpdateMovieUsecase interface.
 * This use case interacts with the MovieApplicationService to update the details of a movie.
 */
@Injectable()
export class UpdateMovieUsecaseApplication implements UpdateMovieUsecase {
  constructor(private readonly movieService: MovieApplicationService) {}

  /**
   * @inheritdoc UpdateMovieUsecase.execute
   */
  async execute(
    updateMovie: UpdateMovieApplicationDto,
  ): Promise<Partial<Movie>> {
    return this.movieService.updateMovieDetail(updateMovie);
  }
}
