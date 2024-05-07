import { UpdateMovieDto } from "../dto/update-movie-dto.interface";
import { Movie } from "../movie.interface";

export interface UpdateMovieUsecase {
  execute(updateMovie: UpdateMovieDto): Promise<Partial<Movie>>;
}
