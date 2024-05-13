import { PaginateQuery, Paginated } from "nestjs-paginate";
import { CreateMovieDto } from "./dto/create-movie-dto.interface";
import { ListMoviesDto } from "./dto/list-movies-dto.interface";
import { UpdateMovieDto } from "./dto/update-movie-dto.interface";
import { Movie } from "./movie.interface";
import { MovieEntity } from "./Movies.entity";

export interface MovieController {
  handleCreateAndPublishMovie(
    createMovie: CreateMovieDto,
  ): Promise<Partial<Movie>>;
  handleFindSavedMoviesList(
    pagination: PaginateQuery,
  ): Promise<Paginated<MovieEntity>>;
  handleFindOneSavedMovie(id: number): Promise<Movie>;
  handleUpdateMovieDetail(updateMovie: UpdateMovieDto): Promise<Partial<Movie>>;
  handleDeleteSavedMovie(id: number): Promise<boolean>;
}
