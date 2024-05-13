import { PaginateQuery, Paginated } from "nestjs-paginate";
import { CreateMovieDto } from "./dto/create-movie-dto.interface";
import { UpdateMovieDto } from "./dto/update-movie-dto.interface";
import { Movie } from "./movie.interface";
import { MovieEntity } from "./Movies.entity";

export interface MovieRepository {
  createMovie(createMovie: CreateMovieDto): Promise<Movie>;
  findAllMovie(pagination: PaginateQuery): Promise<Paginated<MovieEntity>>;
  findOneMovie(id: number): Promise<Movie>;
  updateMovie(id: number, updateMovie: UpdateMovieDto): Promise<Partial<Movie>>;
  deleteMovie(id: number): Promise<boolean>;
}
