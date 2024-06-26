import { FindAllMoviesUsecase } from "@domain/movies/usecase/findall-movies-usecase.interface";
import { Injectable } from "@nestjs/common";
import { ReadMovieDtoImp } from "../dto";
import { MovieServiceImp } from "../movie.service";

/**
 * Injectable use case implementation of the FindAllMoviesUsecase interface.
 */
@Injectable()
export class FindAllMoviesUsecaseImp implements FindAllMoviesUsecase {
  constructor(private readonly movieService: MovieServiceImp) {}

  /**
   * @inheritdoc.FindAllMoviesUsecase.execute
   */
  async execute(): Promise<ReadMovieDtoImp[]> {
    return await this.movieService.findSavedMoviesList();
  }
}
