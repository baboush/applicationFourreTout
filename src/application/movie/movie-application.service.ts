import { MovieEntity, MovieService  } from "@domain/movies";
import { Movie } from "@domain/movies/movie.interface";
import { MovieRepositoryPersistence } from "../../infrastructure/persistence/repositories/movie/movie-repository-persistence";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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

  constructor(
    private readonly movieRepository: MovieRepositoryPersistence,
  ) {
  }

  /**
   * @inheritdoc MovieService.createAndPublishMovie
   */
  async createAndPublishMovie(
    createMovie: CreateMovieApplicationDto,
  ): Promise<Partial<Movie>> {

    if (!createMovie || Object.keys(createMovie).length === 0)
      throw new BadRequestException(`Missing data for movie creation`);

    return await this.movieRepository.createMovie(createMovie);
  }

  /**
   * @inheritdoc MovieService.findSavedMoviesList
   */
  async findSavedMoviesList(): Promise<MovieEntity[]> {
    const movies = await this.movieRepository.findAllMovie();

    if (!movies)
      throw new NotFoundException(`No movies found in database`);

    return movies;
  }

  /**
   * @inheritdoc MovieService.findOneSavedMovie
   */
  async findOneSavedMovie(id: number): Promise<Movie> {
    const movie: ReadMovieApplicationDto =
      await this.movieRepository.findOneMovie(id);

    if (!movie)
      throw new NotFoundException(`Movie with ${id} not exist in database`);

    return movie;
  }

  /**
   * @inheritdoc MovieService.updateMovieDetail
   */
  async updateMovieDetail(
    updateMovie: UpdateMovieApplicationDto,
  ): Promise<Partial<Movie>> {
    const movie = await this.movieRepository.findOneMovie(updateMovie.id);

    if (!movie.id)
      throw new NotFoundException(`Movie width ID ${movie.id} not found`);

    if (!updateMovie || Object.keys(updateMovie).length === 0)
      throw new BadRequestException(`${updateMovie} Missing data`);

    return await this.movieRepository.updateMovie(
      updateMovie.id,
      updateMovie,
    );
  }

  /**
   * @inheritdoc MovieService.deleteSavedMovie
   */
  async deleteSavedMovie(id: number): Promise<boolean> {

    const movie = await this.movieRepository.findOneMovie(id);

    if (!movie)
      throw new NotFoundException(`Movie with ID ${id} not found`);

    const isDeleted = await this.movieRepository.deleteMovie(id);

    if (!isDeleted)
      throw new BadRequestException(`Failed delete movie with ID: ${id} `)

    return isDeleted;
  }
}
