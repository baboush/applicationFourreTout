import { Movie } from "../movie.interface";

export interface FindAllMoviesUsecase {
  execute(): Promise<Movie[]>;
}
