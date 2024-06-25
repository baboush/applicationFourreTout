import {
  CreateMovieDto,
  Movie,
  MovieEntity,
  MovieRepository,
  UpdateMovieDto,
} from "@domain/movies";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MovieRepositoryPersistence implements MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
  ) {}

  /**
   * @inheritdoc MovieRepository.createMovie
   */
  async createMovie(createMovie: CreateMovieDto): Promise<Movie> {


    if (!createMovie)
      throw new BadRequestException(`Movie data is Invalid`);

    const existingMovie = await this.moviesRepository.findBy({
      title: createMovie.title,
      director: createMovie.director,
      poster: createMovie.poster,
    });

    if (existingMovie)
      throw new BadRequestException(`Movie exist in database`);

    return await this.moviesRepository.save(createMovie);
  }

  /**
   * @inheritdoc MovieRepository.findAllMovie
   */
  async findAllMovie(): Promise<MovieEntity[]> {
    return await this.moviesRepository
      .createQueryBuilder("movie")
      .leftJoinAndSelect("movie.categories", "categories")
      .getMany();
  }

  /**
   * @inheritdoc MovieRepository.findOneMovie
   */
  async findOneMovie(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({ id: id });

    if (!movie)
      throw new NotFoundException(`Movie with ${id} not found`);

    return movie;
  }

  /**
   * @inheritdoc MovieRepository.updateMovie
   */
  async updateMovie(
    id: number,
    updateMovie: UpdateMovieDto,
  ): Promise<Partial<Movie>> {

    if (!updateMovie || !id)
      throw new BadRequestException(`Update Movie data is invalid`);

    const updatedMovie = await this.moviesRepository.update(id, updateMovie);

    if (updatedMovie.affected === 0)
      throw new NotFoundException(`Movie Update ${id} not found`);
  
    console.log(updatedMovie.raw);
    return updatedMovie.raw
  }

  /**
   * @inheritdoc MovieRepository.deleteMovie
   */
  async deleteMovie(id: number): Promise<boolean> {
    const deleteMovie = await this.moviesRepository.delete(id);

    if (deleteMovie.affected === 0)
      throw new NotFoundException(`Movie width ${id} not found`);

    return deleteMovie.affected > 0;
  }
}
