import { ListMoviesDto } from "@domain/movies";
import { FindAllMoviesUsecase } from "@domain/movies/usecase/findall-movies-usecase.interface";
import { MovieApplicationService } from "../movie-application.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllMoviesUsecaseApplication implements FindAllMoviesUsecase {
  constructor(private readonly movieService: MovieApplicationService) {}
  async execute(pagination): Promise<ListMoviesDto> {
    return await this.movieService.findSavedMoviesList(pagination);
  }
}
