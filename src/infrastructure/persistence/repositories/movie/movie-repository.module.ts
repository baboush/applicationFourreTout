import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "@domain/movies";
import { MovieRepositoryPersistence } from "./movie-repository-persistence";
import { FavoriesEntity } from "@domain/favories";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, FavoriesEntity])],
  providers: [MovieRepositoryPersistence],
  exports: [MovieRepositoryPersistence],
})
export class MovieRepositoryModule {}
