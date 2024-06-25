import { CategoriesEntity } from "@domain/categories";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesRepositoryPersistence } from "./categories-repository-persistence";
import { MovieEntity } from "@domain/movies";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, CategoriesEntity])],
  providers: [CategoriesRepositoryPersistence],
  exports: [CategoriesRepositoryPersistence],
})
export class CategoriesPersistenceModule {}
