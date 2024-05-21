import { ListMoviesDto, MovieEntity } from "@domain/movies";
import { FindAllMoviesUsecase } from "@domain/movies/usecase/findall-movies-usecase.interface";
import { MovieApplicationService } from "../movie-application.service";
import { Injectable } from "@nestjs/common";
import { PaginateQuery, Paginated } from "nestjs-paginate";

/**
 * Injectable use case implementation of the FindAllMoviesUsecase interface.
 * This use case retrieves a paginated list of movies through the MovieApplicationService.
 */
@Injectable()
export class FindAllMoviesUsecaseApplication implements FindAllMoviesUsecase {
  constructor(private readonly movieService: MovieApplicationService) {}

  /**
   * @inheritdoc.FindAllMoviesUsecase.execute
   */
  async execute(pagination: PaginateQuery): Promise<Paginated<MovieEntity>> {
    return await this.movieService.findSavedMoviesList(pagination);
  }
}
