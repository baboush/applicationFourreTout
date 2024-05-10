import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { TitleMovie, PosterMovie, DirectorMovie } from "@shared/types";
import { CreateMovieDto } from "@domain/movies";

@ApiTags("Movie")
export class CreateMovieDtoApplication implements CreateMovieDto {
  @ApiProperty({ description: "id", type: "Number" })
  @IsNumber()
  @IsNotEmpty()
  readonly id?: number;

  @ApiProperty({ description: "Title book", type: "TitleBook" })
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly title: TitleMovie;

  @ApiProperty({ description: "Title book", type: "TitleBook" })
  @IsString()
  @Length(50, 250)
  @IsNotEmpty()
  readonly poster: PosterMovie;

  @ApiProperty({ description: "Title book", type: "TitleBook" })
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  readonly director: DirectorMovie;
}
