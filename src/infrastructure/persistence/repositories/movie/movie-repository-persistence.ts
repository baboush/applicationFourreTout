import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Movies } from "@domain/movies/Movies.entity";
import { Repository } from "typeorm";
import {
  CreateMovieDto,
  MovieRepository,
  UpdateMovieDto,
} from "@domain/movies";
import { Movie } from "@domain/movies/movie.interface";

@Injectable()
export class MovieRepositoryPersistence implements MovieRepository {
  constructor(
    @InjectRepository(Movies)
    private readonly moviesRepository: Repository<Movies>,
  ) {}

  async createMovie(createMovie: CreateMovieDto): Promise<Movie> {
    const newMovie = this.moviesRepository.create(createMovie);
    return await this.moviesRepository.save(newMovie);
  }

  async findAllMovie(): Promise<Movie[]> {
    const listMovies = await this.moviesRepository.find();
    return listMovies;
  }

  async findOneMovie(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({ id: id });
    return movie;
  }

  async updateMovie(
    id: number,
    updateMovie: UpdateMovieDto,
  ): Promise<Partial<Movie>> {
    const movie = await this.moviesRepository.update(id, updateMovie);
    const mergeMovie = movie.affected[0];
    return mergeMovie;
  }

  async deleteMovie(id: number): Promise<boolean> {
    const isDelete = true;
    const deleteMovie = await this.moviesRepository.delete(id);
    if (deleteMovie) {
      return isDelete;
    }
    return !isDelete;
  }
}
