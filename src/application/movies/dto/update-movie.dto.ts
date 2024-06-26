import { UpdateMovieDto } from "@domain/movies";
import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

/**
 * Application-specific DTO class representing data for updating a movie.
 * This DTO likely extends a domain-specific `UpdateMovieDto` class
 * and adds presentation logic or validation rules.
 * It targets the "Movie" endpoint group within a NestJS application.
 */
export class UpdateMovieDtoImp implements UpdateMovieDto {
  /**
   * @inheritdoc.UpdateMovieDto.id
   */
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  /**
   * @inheritdoc.UpdateMovieDto.title
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: TitleMovie;

  /**
   * @inheritdoc.UpdateMovieDto.poster
   */
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterMovie;

  /**
   * @inheritdoc.UpdateMovieDto.director
   */
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly director: DirectorMovie;
}
