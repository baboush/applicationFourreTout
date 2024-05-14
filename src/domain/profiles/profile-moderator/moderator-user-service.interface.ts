import { BaseProfileService } from "../base";
import { AddFavoreMovie } from "./dto/add-favore-movie/add-favore-movie.interface";

export interface ModeratorUserService extends BaseProfileService {
  addMovieCategory(): Promise<AddFavoreMovie>;
  removeMovieCategory(): Promise<boolean>;
}
