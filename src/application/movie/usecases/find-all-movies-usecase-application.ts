import { MovieEntity } from "@domain/movies";
import { FindAllMoviesUsecase } from "@domain/movies/usecase/findall-movies-usecase.interface";
import { MovieApplicationService } from "../movie-application.service";
import { Injectable } from "@nestjs/common";

/**
 * Injectable use case implementation of the FindAllMoviesUsecase interface.
 */
@Injectable()
export class FindAllMoviesUsecaseApplication implements FindAllMoviesUsecase {
  constructor(private readonly movieService: MovieApplicationService) {}

  /**
   * @inheritdoc.FindAllMoviesUsecase.execute
   */
  async execute(): Promise<MovieEntity[]> {
    return await this.movieService.findSavedMoviesList();
  }
}
