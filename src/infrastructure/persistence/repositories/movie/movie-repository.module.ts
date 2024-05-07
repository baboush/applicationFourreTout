import { Movies } from "@domain/movies/Movies.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieRepositoryPersistence } from "./movie-repository-persistence";

@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  providers: [MovieRepositoryPersistence],
})
export class MovieRepositoryModule {}
