import { PaginateQuery, Paginated } from "nestjs-paginate";
import { CreateMovieDto } from "./dto/create-movie-dto.interface";
import { UpdateMovieDto } from "./dto/update-movie-dto.interface";
import { Movie } from "./movie.interface";
import { MovieEntity } from "./Movies.entity";

export interface MovieService {
  createAndPublishMovie(createMovie: CreateMovieDto): Promise<Partial<Movie>>;
  findSavedMoviesList(
    pagination: PaginateQuery,
  ): Promise<Paginated<MovieEntity>>;
  findOneSavedMovie(id: number): Promise<Movie>;
  updateMovieDetail(updateMovie: UpdateMovieDto): Promise<Partial<Movie>>;
  deleteSavedMovie(id: number): Promise<boolean>;
}
