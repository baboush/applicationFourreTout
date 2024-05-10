import { MovieApplicationService } from "../movie-application.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteMovieUsecaseApplication {
  constructor(private readonly movieService: MovieApplicationService) {}

  async execute(id: number): Promise<boolean> {
    return await this.movieService.deleteSavedMovie(id);
  }
}
