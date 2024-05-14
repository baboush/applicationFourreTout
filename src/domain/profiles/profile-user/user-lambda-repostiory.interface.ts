import { BaseProfileRepository } from "../base";
import { AddFavortiteMovie } from "./dto/add-favortite-movie.interface";
import { AddMovieList } from "./dto/add-movie-list.interface";

export interface UserLambdaRepostiory extends BaseProfileRepository {
  addMovie(id: number): Promise<AddMovieList>;
  removeMovie(id: number): Promise<boolean>;
  addMovieFavorite(id: number): Promise<AddFavortiteMovie>;
}
