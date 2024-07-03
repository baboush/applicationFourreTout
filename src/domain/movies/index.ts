import { CreateMovieDto, UpdateMovieDto, ReadMovieDto } from "./dto";
import { MovieController } from "./movie-controller.interface";
import { MovieRepository } from "./movie-repository.interface";
import { MovieService } from "./movie-service.interface";
import { MovieEntity } from "./Movies.entity";
import { Movie } from "./movie.interface";

export {
  CreateMovieDto,
  UpdateMovieDto,
  ReadMovieDto,
  MovieController,
  MovieService,
  MovieRepository,
  MovieEntity,
  Movie,
};
