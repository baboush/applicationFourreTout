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
  @IsString({ message: "title movie must be a string" })
  @Length(3, 80, { message: "title movie must be between 3 and 80 characters" })
  @IsNotEmpty({ message: "title movie must not be empty" })
  readonly title: TitleMovie;

  /**
   * @inheritdoc.UpdateMovieDto.poster
   */
  @IsString({ message: "poster movie must be a string" })
  @Length(50, 250, {
    message: "poster movie must be between 50 and 250 characters",
  })
  @IsNotEmpty({ message: "poster movie must not be empty" })
  readonly poster: PosterMovie;

  /**
   * @inheritdoc.UpdateMovieDto.director
   */
  @IsString({ message: "director movie must be a string" })
  @Length(3, 80, {
    message: "director movie must be between 3 and 80 characters",
  })
  @IsNotEmpty({ message: "director movie must not be empty" })
  readonly director: DirectorMovie;
}
