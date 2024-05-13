import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";
import { UpdateMovieDto } from "@domain/movies";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

@ApiTags("Movie")
export class UpdateMovieDtoApplication implements UpdateMovieDto {
  @ApiProperty({ description: "id", type: "number" })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ description: "Title Movie", type: "string" })
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: "Poster Movie", type: "string" })
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterMovie;

  @ApiProperty({ description: "Director Movie", type: "string" })
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly director: DirectorMovie;
}
