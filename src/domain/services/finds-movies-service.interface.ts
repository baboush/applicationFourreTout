import { Movie } from '@domain/interfaces/movie.interface';
import { BaseFindsService } from './base-finds-service.interface';

export interface FindsMoviesService extends BaseFindsService {
  findAll(): Promise<Movie[]>;
  findByOne(id: number): Promise<Movie>;
  findOrderByDate(): Promise<Movie>;
}
