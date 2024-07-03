import { CategoriesEntity } from "@domain/categories";
import { FavoriesEntity } from "@domain/favories";
import { ReadMovieDto } from "@domain/movies";
import { ProfileEntity } from "@domain/profiles";
import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from "class-validator";

/**
 * @inheritdoc ReadMovieDto
 */
export class ReadMovieDtoImp implements ReadMovieDto {
  /**
   * @inheritdoc ReadMovieDto.id
   */
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  /**
   * @inheritdoc ReadMovieDto.title
   */
  @IsString({ message: "title movie must be a string" })
  @Length(3, 80, { message: "title movie must be between 3 and 80 characters" })
  @IsNotEmpty({ message: "title movie must not be empty" })
  readonly title: TitleMovie;

  /**
   * @inheritdoc ReadMovieDto.poster
   */
  @IsString({ message: "poster movie must be a string" })
  @Length(50, 250, {
    message: "poster movie must be between 50 and 250 characters",
  })
  @IsNotEmpty({ message: "poster movie must not be empty" })
  readonly poster: PosterMovie;

  /**
   * @inheritdoc ReadMovieDto.director
   */
  @IsString({ message: "director movie must be a string" })
  @Length(3, 80, {
    message: "director movie must be between 3 and 80 characters",
  })
  @IsNotEmpty({ message: "director movie must not be empty" })
  readonly director: DirectorMovie;

  @IsArray({ message: "categories must be an array" })
  readonly categories?: CategoriesEntity[];

  @IsArray({ message: "favories must be an array" })
  readonly favories?: FavoriesEntity[];

  @IsArray({ message: "profiles must be an array" })
  readonly profiles?: ProfileEntity[];
}
