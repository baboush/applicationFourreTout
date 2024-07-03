import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";
import { CategoriesEntity } from "..";

/**
 * @interface AddCategoryMovieDto
 * @description Interface representing the data required to add a category or categories to a movie.
 */
export interface AddCategoryMovieDto {
  /**
   * The title of the movie.
   */
  readonly title: TitleMovie;

  /**
   * The director of the movie.
   */
  readonly director: DirectorMovie;

  /**
   * The poster URL or image data for the movie.
   */
  readonly poster: PosterMovie;

  /**
   * The ID(s) or the entire category entity/entities to associate with the movie.
   */
  readonly categories: CategoriesEntity[];
}
