import { FavoriesEntity } from "@domain/favories";
import { MovieEntity } from "@domain/movies";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieRepositoryPersistence } from "./movie-repository-persistence";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, FavoriesEntity])],
  providers: [MovieRepositoryPersistence],
  exports: [MovieRepositoryPersistence],
})
export class MovieRepositoryModule {}
