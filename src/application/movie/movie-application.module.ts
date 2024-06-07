import { Module, forwardRef } from "@nestjs/common";
import { MovieApplicationService } from "./movie-application.service";
import { MovieApplicationController } from "./movie-application.controller";
import { MovieRepositoryModule } from "@infrastructure/persistence/repositories";
import {
  CreateMoviesUsecaseApplication,
  DeleteMovieUsecaseApplication,
  FindAllMoviesUsecaseApplication,
  ReadMovieUsecaseApplication,
  UpdateMovieUsecaseApplication,
} from "./usecases";
import { MoviesControllerSse } from "./movies-application-sse.controllers";

@Module({
  imports: [forwardRef(() => MovieRepositoryModule)],
  providers: [
    MovieApplicationService,
    CreateMoviesUsecaseApplication,
    UpdateMovieUsecaseApplication,
    DeleteMovieUsecaseApplication,
    ReadMovieUsecaseApplication,
    FindAllMoviesUsecaseApplication,
  ],
  controllers: [MovieApplicationController, MoviesControllerSse],
})
export class MovieApplicationModule {}
