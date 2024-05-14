import { BaseProfileController } from "../base";
import { AddFavoreMovie } from "./dto/add-favore-movie/add-favore-movie.interface";

export interface ModeratorUserController extends BaseProfileController {
  handlerAddMovieCategorie(): Promise<AddFavoreMovie>;
  handlerDeleteMovieCategorie(): Promise<boolean>;
}
