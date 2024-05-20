import { CategoriesEntity } from "@domain/categories";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategorieRepositoryPersistence } from "./categorie-repository-persistence";

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  providers: [CategorieRepositoryPersistence],
  exports: [CategorieRepositoryPersistence],
})
export class CategoriePersistenceModule {}
