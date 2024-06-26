import { DeleteMovieUsecase } from "@domain/movies/usecase";
import { Injectable } from "@nestjs/common";
import { MovieServiceImp } from "../movie.service";

/**
 * Injectable use case implementation for deleting a movie.
 * This use case interacts with the MovieApplicationService to delete a movie by its ID.
 */
@Injectable()
export class DeleteMovieUsecaseImp implements DeleteMovieUsecase {
  constructor(private readonly movieService: MovieServiceImp) {}

  /**
   * @inheritdoc DeleteMovieUsecase.execute
   */
  async execute(id: number): Promise<boolean> {
    return await this.movieService.deleteSavedMovie(id);
  }
}
