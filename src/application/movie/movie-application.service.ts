import { MovieEntity, MovieService, UpdateMovieDto } from "@domain/movies";
import { Movie } from "@domain/movies/movie.interface";
import { MovieRepositoryPersistence } from "../../infrastructure/persistence/repositories/movie/movie-repository-persistence";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { movieSchema } from "@shared/types/movie-types";
import {
  CreateMovieApplicationDto,
  ReadMovieApplicationDto,
  UpdateMovieApplicationDto,
} from "./dto";

/**
 * Injectable application service implementation of the MovieService interface.
 * This class interacts with the MovieRepository to manage movie data at the application level.
 * It handles additional logic beyond data persistence.
 */
@Injectable()
export class MovieApplicationService implements MovieService {
  /**
   * Injected MovieRepository for data persistence.
   */
  private readonly movieRepository: MovieRepositoryPersistence;
  constructor(
    private readonly MovieRepositoryPersistence: MovieRepositoryPersistence,
  ) {
    this.movieRepository = MovieRepositoryPersistence;
  }

  /**
   * @inheritdoc MovieService.createAndPublishMovie
   */
  async createAndPublishMovie(
    createMovie: CreateMovieApplicationDto,
  ): Promise<Partial<Movie>> {
    const newMovie = { ...createMovie };

    if (!newMovie && !movieSchema.parse(newMovie)) {
      throw new BadRequestException(`${newMovie} Missing data !`);
    }

    return await this.movieRepository.createMovie(newMovie);
  }

  /**
   * @inheritdoc MovieService.findSavedMoviesList
   */
  async findSavedMoviesList(): Promise<MovieEntity[]> {
    return await this.movieRepository.findAllMovie();
  }

  /**
   * @inheritdoc MovieService.findOneSavedMovie
   */
  async findOneSavedMovie(id: number): Promise<Movie> {
    const movie: ReadMovieApplicationDto =
      await this.movieRepository.findOneMovie(id);

    if (!movie && !movieSchema.parse(movie)) {
      throw new NotFoundException(`${movie} Does not exist in database`);
    }
    return movie;
  }

  /**
   * @inheritdoc MovieService.updateMovieDetail
   */
  async updateMovieDetail(
    updateMovie: UpdateMovieDto,
  ): Promise<Partial<Movie>> {
    const updatedMovie: UpdateMovieApplicationDto = { ...updateMovie };

    if (!updatedMovie.id) {
      throw new NotFoundException(
        `Movie width ID ${updatedMovie.id} not found`,
      );
    }

    if (!updatedMovie && !movieSchema.parse(updatedMovie)) {
      throw new BadRequestException(`${updatedMovie} Missing data`);
    }

    return await this.movieRepository.updateMovie(
      updatedMovie.id,
      updatedMovie,
    );
  }

  /**
   * @inheritdoc MovieService.deleteSavedMovie
   */
  async deleteSavedMovie(id: number): Promise<boolean> {
    const isDeleted = await this.movieRepository.deleteMovie(id);

    if (!isDeleted) {
      throw new NotFoundException(`Movie width ID ${id} not found`);
    }

    return !!isDeleted;
  }
}
