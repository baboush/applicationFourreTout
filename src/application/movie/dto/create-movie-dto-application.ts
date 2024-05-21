import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { TitleMovie, PosterMovie, DirectorMovie } from "@shared/types";
import { CreateMovieDto } from "@domain/movies";

/**
 * Application-specific DTO class representing data for creating a new movie.
 * This DTO likely extends a domain-specific `CreateMovieDto` class
 * and adds presentation logic or validation rules.
 * It targets the "Movie" endpoint group within a NestJS application.
 */
@ApiTags("Movie")
export class CreateMovieDtoApplication implements CreateMovieDto {
  /**
   * @inheritdoc CreateMovieDto.id
   */
  @ApiProperty({ description: "id", type: "Number" })
  @IsNumber()
  @IsNotEmpty()
  readonly id?: number;

  /**
   * @inheritdoc CreateMovieDto.title
   */
  @ApiProperty({ description: "Title book", type: "TitleBook" })
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: TitleMovie;

  /**
   * @inheritdoc CreateMovieDto.poster
   */
  @ApiProperty({ description: "Title book", type: "TitleBook" })
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterMovie;

  /**
   * @inheritdoc CreateMovieDto.director
   */
  @ApiProperty({ description: "Title book", type: "TitleBook" })
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly director: DirectorMovie;
}
