import { CategoriesEntity } from "@domain/categories";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategorieRepositoryPersistence } from "./categorie-repository-persistence";
import { MovieEntity } from "@domain/movies";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, CategoriesEntity])],
  providers: [CategorieRepositoryPersistence],
  exports: [CategorieRepositoryPersistence],
})
export class CategoriePersistenceModule {}
