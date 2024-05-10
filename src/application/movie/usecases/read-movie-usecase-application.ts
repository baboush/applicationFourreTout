import { Movie, ReadMovieUsecase } from "@domain/movies";
import { MovieApplicationService } from "../movie-application.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReadMovieUsecaseApplication implements ReadMovieUsecase {
  constructor(private readonly movieService: MovieApplicationService) {}

  async execute(id: number): Promise<Movie> {
    return await this.movieService.findOneSavedMovie(id);
  }
}
