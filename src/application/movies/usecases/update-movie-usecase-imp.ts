import {  UpdateMovieUsecase } from "@domain/movies";
import { Injectable } from "@nestjs/common";
import { UpdateMovieDtoImp  } from "../dto";
import { MovieServiceImp } from "../movie.service";

/**
 * Injectable use case implementation of the UpdateMovieUsecase interface.
 * This use case interacts with the MovieImpService to update the details of a movie.
 */
@Injectable()
export class UpdateMovieUsecaseImp implements UpdateMovieUsecase {
  constructor(private readonly movieService: MovieServiceImp) {}

  /**
   * @inheritdoc UpdateMovieUsecase.execute
   */
  async execute(
    updateMovie: UpdateMovieDtoImp,
  ): Promise<Partial<UpdateMovieDtoImp>> {
    return this.movieService.updateMovieDetail(updateMovie);
  }
}
