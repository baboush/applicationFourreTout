import { Module, forwardRef } from "@nestjs/common";
import { MovieControllerImp } from "./movie.controller";
import { MovieRepositoryModule } from "@infrastructure/persistence/repositories";
import {
  CreateMovieUsecaseImp,
  UpdateMovieUsecaseImp,
  ReadMovieUsecaseImp,
  FindAllMoviesUsecaseImp,
  DeleteMovieUsecaseImp
} from "./usecases";
import { MovieServiceImp } from "./movie.service";

@Module({
  imports: [forwardRef(() => MovieRepositoryModule)],
  providers: [
    MovieServiceImp,
    CreateMovieUsecaseImp,
    UpdateMovieUsecaseImp,
    ReadMovieUsecaseImp,
    FindAllMoviesUsecaseImp,
    DeleteMovieUsecaseImp
  ],
  controllers: [MovieControllerImp],
})
export class MovieModule {}
