import { CreateMovieDto } from "./dto/create-movie-dto.interface";
import { UpdateMovieDto } from "./dto/update-movie-dto.interface";
import { Movie } from "./movie.interface";

export interface MovieRepository {
  createMovie(createMovie: CreateMovieDto): Promise<Movie>;
  findAllMovie(): Promise<Movie[]>;
  findOneMovie(id: number): Promise<Movie>;
  updateMovie(id: number, updateMovie: UpdateMovieDto): Promise<Partial<Movie>>;
  deleteMovie(id: number): Promise<boolean>;
}
