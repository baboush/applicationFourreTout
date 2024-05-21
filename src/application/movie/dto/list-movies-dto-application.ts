import { ListMoviesDto, Movie } from "@domain/movies";
import { ApiProperty } from "@nestjs/swagger";
import { DirectorMovie, PosterMovie, TitleMovie } from "@shared/types";
import { IsArray, IsNumber } from "class-validator";

//TODO: Check if ListMoviesDtoApplication is use
export class ListMoviesDtoApplication implements ListMoviesDto {
  readonly id: number;
  readonly title: TitleMovie;
  readonly poster: PosterMovie;
  readonly director: DirectorMovie;
}
