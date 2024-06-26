import {  ReadMovieUsecase } from "@domain/movies";
import { Injectable } from "@nestjs/common";
import { ReadMovieDtoImp } from "../dto";
import { MovieServiceImp } from "../movie.service";

/**
 * Injectable use case implementation for reading a movie by ID.
 * This use case interacts with the MovieImpService to retrieve a single movie.
 */
@Injectable()
export class ReadMovieUsecaseImp implements ReadMovieUsecase {
  constructor(private readonly movieService: MovieServiceImp) {}

  /**
   * @inheritdoc.ReadMovieUsecase.execute
   */
  async execute(id: number): Promise<ReadMovieDtoImp> {
    return await this.movieService.findOneSavedMovie(id);
  }
}
