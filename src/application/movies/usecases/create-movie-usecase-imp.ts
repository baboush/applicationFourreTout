import {  CreateMovieUsecase } from "@domain/movies";
import { Injectable } from "@nestjs/common";
import { CreateMovieDtoImp } from "../dto";
import { MovieServiceImp } from "../movie.service";

/**
 * Injectable use case implementation of the CreateMovieUsecase interface.
 * This use case orchestrates the creation and publishing of a new movie through the MovieImpService.
 */
@Injectable()
export class CreateMovieUsecaseImp implements CreateMovieUsecase {
  constructor(private readonly movieService: MovieServiceImp) {}

  /**
   * @inheritdoc CreateMovieUsecase.execute
   */
  async execute(
    createMovie: CreateMovieDtoImp,
  ): Promise<Partial<CreateMovieDtoImp>> {
    return await this.movieService.createAndPublishMovie(createMovie);
  }
}
