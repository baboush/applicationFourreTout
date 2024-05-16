import { MovieEntity, MovieService, UpdateMovieDto } from "@domain/movies";
import { Movie } from "@domain/movies/movie.interface";
import { MovieRepositoryPersistence } from "../../infrastructure/persistence/repositories/movie/movie-repository-persistence";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMovieDtoApplication } from "./dto/create-movie-dto-application";
import { ReadMovieDtoApplication } from "./dto/read-movie-dto-application";
import { UpdateMovieDtoApplication } from "./dto/update-movie-dto-application";
import { PaginateQuery, Paginated } from "nestjs-paginate";

@Injectable()
export class MovieApplicationService implements MovieService {
  constructor(private readonly movieRepository: MovieRepositoryPersistence) {}

  async createAndPublishMovie(
    createMovie: CreateMovieDtoApplication,
  ): Promise<Partial<Movie>> {
    const newMovie = { ...createMovie };

    if (!newMovie) {
      throw new BadRequestException(`${newMovie} Missing data !`);
    }

    return await this.movieRepository.createMovie(newMovie);
  }

  async findSavedMoviesList(
    pagination: PaginateQuery,
  ): Promise<Paginated<MovieEntity>> {
    return await this.movieRepository.findAllMovie(pagination);
  }

  async findOneSavedMovie(id: number): Promise<Movie> {
    const movie: ReadMovieDtoApplication =
      await this.movieRepository.findOneMovie(id);

    if (!ReadMovieDtoApplication) {
      throw new NotFoundException(`${movie} Does not exist in database`);
    }
    return movie;
  }

  async updateMovieDetail(
    updateMovie: UpdateMovieDto,
  ): Promise<Partial<Movie>> {
    const updatedMovie: UpdateMovieDtoApplication = { ...updateMovie };

    if (!updatedMovie) {
      throw new BadRequestException(`${updatedMovie} Missing data`);
    }

    return await this.movieRepository.updateMovie(
      updatedMovie.id,
      updatedMovie,
    );
  }

  async deleteSavedMovie(id: number): Promise<boolean> {
    const isDeleted = true;
    const movie = await this.movieRepository.findOneMovie(id);

    if (!movie) {
      throw new NotFoundException(`${movie} Not found in database`);
    }

    await this.movieRepository.deleteMovie(id);
    return isDeleted;
  }
}
