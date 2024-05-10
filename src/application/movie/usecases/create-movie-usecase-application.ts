import { CreateMovieDto, CreateMovieUsecase, Movie } from "@domain/movies";
import { CreateMovieDtoApplication } from "../dto/create-movie-dto-application";
import { MovieApplicationService } from "../movie-application.service";
import { Injectable } from "@nestjs/common";
@Injectable()
export class CreateMoviesUsecaseApplication implements CreateMovieUsecase {
  constructor(private readonly movieService: MovieApplicationService) {}
  async execute(
    createMovie: CreateMovieDtoApplication,
  ): Promise<Partial<Movie>> {
    return await this.movieService.createAndPublishMovie(createMovie);
  }
}
