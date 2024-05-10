import { ListMoviesDto } from "../dto/list-movies-dto.interface";

export interface FindAllMoviesUsecase {
  execute(pagination): Promise<ListMoviesDto>;
}
