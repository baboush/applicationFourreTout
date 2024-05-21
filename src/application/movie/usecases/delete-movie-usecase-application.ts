import { DeleteMovieUsecase } from "@domain/movies/usecase";
import { MovieApplicationService } from "../movie-application.service";
import { Injectable } from "@nestjs/common";

/**
 * Injectable use case implementation for deleting a movie.
 * This use case interacts with the MovieApplicationService to delete a movie by its ID.
 */
@Injectable()
export class DeleteMovieUsecaseApplication implements DeleteMovieUsecase {
  constructor(private readonly movieService: MovieApplicationService) {}

  /**
   * @inheritdoc DeleteMovieUsecase.execute
   */
  async execute(id: number): Promise<boolean> {
    return await this.movieService.deleteSavedMovie(id);
  }
}
