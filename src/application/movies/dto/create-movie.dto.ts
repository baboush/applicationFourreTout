import { IsDefined, IsNotEmpty, IsString, Length } from "class-validator";
import { TitleMovie, PosterMovie, DirectorMovie } from "@shared/types";
import { CreateMovieDto } from "@domain/movies";

/*
 * @inheritdoc CreateMovieDto
 */
export class CreateMovieDtoImp implements CreateMovieDto {
  /**
   * @inheritdoc CreateMovieDto.title
   */
  @IsString({ message: "title movie must be a string" })
  @Length(3, 80, { message: "title movie must be between 3 and 80 characters" })
  @IsNotEmpty({ message: "title movie must not be empty" })
  @IsDefined({ message: "title movie must be defined" })
  readonly title: TitleMovie;

  /**
   * @inheritdoc CreateMovieDto.poster
   */
  @IsString({ message: "poster movie must be a string" })
  @Length(50, 250, {
    message: "poster movie must be between 50 and 250 characters",
  })
  @IsNotEmpty({ message: "poster movie must not be empty" })
  @IsDefined({ message: "poster movie must be defined" })
  readonly poster: PosterMovie;

  /**
   * @inheritdoc CreateMovieDto.director
   */
  @IsString({ message: "director movie must be a string" })
  @Length(3, 80, {
    message: "director movie must be between 3 and 80 characters",
  })
  @IsNotEmpty({ message: "director movie must not be empty" })
  @IsDefined({ message: "director movie must be defined" })
  readonly director: DirectorMovie;
}
