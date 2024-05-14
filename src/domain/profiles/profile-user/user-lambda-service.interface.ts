import { BaseProfileService } from "../base";
import { AddFavortiteMovie } from "./dto/add-favortite-movie.interface";
import { AddMovieList } from "./dto/add-movie-list.interface";

export interface UserLambdaService extends BaseProfileService {
  addMovieInList(id: number): Promise<AddMovieList>;
  removeMovieInList(id: number): Promise<boolean>;
  addMovieFavorie(id: number): Promise<AddFavortiteMovie>;
}
