import { ListMoviesDto, Movie } from "@domain/movies";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class ListMoviesDtoApplication implements ListMoviesDto {
  constructor() {}
  @ApiProperty({ description: "List items movies", type: "Movie[]" })
  @IsArray()
  readonly itemsMovies: Movie[];

  @ApiProperty({ description: "Count items pagination", type: "number" })
  @IsNumber()
  readonly itemsCount: number;
}
