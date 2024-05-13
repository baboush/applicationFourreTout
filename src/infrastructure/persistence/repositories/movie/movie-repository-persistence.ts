import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ListMoviesDto, Movie } from "@domain/movies";
import { MovieEntity } from "@domain/movies";
import {
  CreateMovieDto,
  MovieRepository,
  UpdateMovieDto,
} from "@domain/movies";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";

@Injectable()
export class MovieRepositoryPersistence implements MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
  ) {}

  async createMovie(createMovie: CreateMovieDto): Promise<Movie> {
    const newMovie = this.moviesRepository.create(createMovie);
    return await this.moviesRepository.save(newMovie);
  }

  async findAllMovie(
    pagination: PaginateQuery,
  ): Promise<Paginated<MovieEntity>> {
    return paginate(pagination, this.moviesRepository, {
      sortableColumns: ["id", "title", "director", "poster"],
      defaultSortBy: [["title", "DESC"]],
      searchableColumns: ["title", "director"],
      select: ["id", "title", "director", "poster"],
    });
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
