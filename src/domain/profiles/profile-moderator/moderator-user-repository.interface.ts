import { AddFavoreMovie } from "./dto/add-favore-movie/add-favore-movie.interface";
import { BaseProfileRepository } from "../base";

export interface ModeratorUserRepository extends BaseProfileRepository {
  addMovieCategorie(): Promise<AddFavoreMovie>;
  deleteMovieCategorie(): Promise<boolean>;
}
