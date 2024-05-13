import { Paginated, PaginateQuery } from "nestjs-paginate";
import { MovieEntity } from "../Movies.entity";

export interface FindAllMoviesUsecase {
  execute(pagination: PaginateQuery): Promise<Paginated<MovieEntity>>;
}
