import { BaseProfileController } from "../base";
import { AddFavortiteMovie } from "./dto/add-favortite-movie.interface";
import { AddMovieList } from "./dto/add-movie-list.interface";

export interface UserLambdaController extends BaseProfileController {
  handlerSaveMovieInProfile(): Promise<AddMovieList>;
  handlerRemoveMovieSavedInProfile(id: number): Promise<boolean>;
  handlerSaveMovieInProfileFavorite(id: number): Promise<AddFavortiteMovie>;
}
