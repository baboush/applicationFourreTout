import { CreateMovieDto } from "../dto/create-movie-dto.interface";
import { Movie } from "../movie.interface";

export interface CreateMovieUsecase {
  execute(createMovie: CreateMovieDto): Promise<Movie>;
}
