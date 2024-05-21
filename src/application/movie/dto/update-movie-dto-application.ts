import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";
import { UpdateMovieDto } from "@domain/movies";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

/**
 * Application-specific DTO class representing data for updating a movie.
 * This DTO likely extends a domain-specific `UpdateMovieDto` class
 * and adds presentation logic or validation rules.
 * It targets the "Movie" endpoint group within a NestJS application.
 */
@ApiTags("Movie")
export class UpdateMovieDtoApplication implements UpdateMovieDto {
  /**
   * @inheritdoc.UpdateMovieDto.id
   */
  @ApiProperty({ description: "id", type: "number" })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  /**
   * @inheritdoc.UpdateMovieDto.title
   */
  @ApiProperty({ description: "Title Movie", type: "string" })
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: string;

  /**
   * @inheritdoc.UpdateMovieDto.poster
   */
  @ApiProperty({ description: "Poster Movie", type: "string" })
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterMovie;

  /**
   * @inheritdoc.UpdateMovieDto.director
   */
  @ApiProperty({ description: "Director Movie", type: "string" })
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly director: DirectorMovie;
}
