import { Movie, UpdateMovieUsecase } from "@domain/movies";
import { MovieApplicationService } from "../movie-application.service";
import { Injectable } from "@nestjs/common";
import { UpdateMovieDtoApplication } from "../dto/update-movie-dto-application";

@Injectable()
export class UpdateMovieUsecaseApplication implements UpdateMovieUsecase {
  constructor(private readonly movieService: MovieApplicationService) {}
  async execute(
    updateMovie: UpdateMovieDtoApplication,
  ): Promise<Partial<Movie>> {
    return this.movieService.updateMovieDetail(updateMovie);
  }
}
