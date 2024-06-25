import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { TitleMovie, PosterMovie, DirectorMovie } from "@shared/types";
import { CreateMovieDto } from "@domain/movies";

/*
 * @inheritdoc CreateMovieDto
 */
export class CreateMovieApplicationDto implements CreateMovieDto {
  /**
   * @inheritdoc CreateMovieDto.id
   */
  @IsNumber()
  @IsNotEmpty()
  readonly id?: number;

  /**
   * @inheritdoc CreateMovieDto.title
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: TitleMovie;

  /**
   * @inheritdoc CreateMovieDto.poster
   */
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterMovie;

  /**
   * @inheritdoc CreateMovieDto.director
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly director: DirectorMovie;
}
