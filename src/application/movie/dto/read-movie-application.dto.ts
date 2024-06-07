import { ApiProperty, ApiTags } from "@nestjs/swagger";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from "class-validator";
import { ReadMovieDto } from "@domain/movies";
import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";
import { CategoriesEntity } from "@domain/categories";
import { FavoriesEntity } from "@domain/favories";
import { ProfileEntity } from "@domain/profiles";

/**
 * @inheritdoc ReadMovieDto
 */
@ApiTags("Movie")
export class ReadMovieApplicationDto implements ReadMovieDto {
  /**
   * @inheritdoc ReadMovieDto.id
   */
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  /**
   * @inheritdoc ReadMovieDto.title
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: TitleMovie;

  /**
   * @inheritdoc ReadMovieDto.poster
   */
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterMovie;

  /**
   * @inheritdoc ReadMovieDto.director
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly director: DirectorMovie;

  @IsArray()
  readonly categories?: CategoriesEntity[];

  @IsArray()
  readonly favories?: FavoriesEntity[];

  @IsArray()
  readonly profiles?: ProfileEntity[];
}
