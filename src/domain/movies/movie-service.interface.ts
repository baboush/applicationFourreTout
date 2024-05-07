import { CreateMovieDto } from "./dto/create-movie-dto.interface";
import { UpdateMovieDto } from "./dto/update-movie-dto.interface";
import { Movie } from "./movie.interface";

export interface MovieService {
  createAndPublishMovie(createMovie: CreateMovieDto): Promise<Movie>;
  findSavedMoviesList(): Promise<Movie[]>;
  findOneSavedMovie(id: number): Promise<Movie>;
  updateMovieDetail(updateMovie: UpdateMovieDto): Promise<Partial<Movie>>;
  deleteSavedMovie(id: number): Promise<boolean>;
}
