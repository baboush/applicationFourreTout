import { Movie } from "../movie.interface";

export interface ReadMovieUsecase {
  execute(id: number): Promise<Movie>;
}
