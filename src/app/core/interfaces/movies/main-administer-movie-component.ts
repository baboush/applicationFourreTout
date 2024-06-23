import { Signal } from "@angular/core";
import { MovieEntity } from "../../http/model/movieEntity";
import { BaseMainComponent } from "../base/base-main-component";
import { Movie } from "./movie";

export interface MainAdministerMovieComponent extends BaseMainComponent<Movie> {

  movies: Signal<MovieEntity[]>;
  movie: Signal<Partial<Movie>>;
  movieId: Signal<number>;

}
