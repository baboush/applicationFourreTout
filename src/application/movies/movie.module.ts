import { Module, forwardRef } from "@nestjs/common";
import { MovieControllerImp } from "./movie.controller";
import { MovieRepositoryModule } from "@infrastructure/persistence/repositories";
import { MovieServiceImp } from "./movie.service";

@Module({
  imports: [forwardRef(() => MovieRepositoryModule)],
  providers: [MovieServiceImp],
  controllers: [MovieControllerImp],
})
export class MovieModule {}
