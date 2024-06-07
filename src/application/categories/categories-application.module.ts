import { Module, forwardRef } from "@nestjs/common";
import { CategoriePersistenceModule } from "@infrastructure/persistence/repositories/categories/categorie-persistence.module";
import { CreateCategoryUsecaseApplication } from "./usecases/create-category-usecase-application";
import { DeleteCategoryMovieUsecaseApplication } from "./usecases/movies-usecase/delete-category-movie-usecase-application";
import { DeleteCategoryUsecaseApplication } from "./usecases/delete-category-usecase-application";
import { AddCategoryMovieUsecaseApplication } from "./usecases/movies-usecase/add-category-movie-usecase-application";
import { CategoriesApplicationController } from "./categories-application.controller";
import { CategoryiesApplicationService } from "./categories-application.service";
import { FindCategoriesUsecaseApplication } from "./usecases/find-categories-usecase-application";

@Module({
  imports: [forwardRef(() => CategoriePersistenceModule)],
  controllers: [CategoriesApplicationController],
  providers: [
    CategoryiesApplicationService,
    CreateCategoryUsecaseApplication,
    AddCategoryMovieUsecaseApplication,
    DeleteCategoryMovieUsecaseApplication,
    DeleteCategoryUsecaseApplication,
    FindCategoriesUsecaseApplication,
  ],
})
export class CategoriesApplicationModule {}
