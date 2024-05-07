import { CreateMovieDto } from "./dto/create-movie-dto.interface";
import { UpdateMovieDto } from "./dto/update-movie-dto.interface";
import { Movie } from "./movie.interface";

export interface MovieController {
  handleCreateAndPublishMovie(createMovie: CreateMovieDto): Promise<Movie>;
  handleFindSavedMoviesList(): Promise<Movie[]>;
  handleFindOneSavedMovie(id: number): Promise<Movie>;
  handleUpdateMovieDetail(updateMovie: UpdateMovieDto): Promise<Partial<Movie>>;
  handleDeleteSavedMovie(id: number): Promise<boolean>;
}
