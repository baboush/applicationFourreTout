import { Module, forwardRef } from "@nestjs/common";
import { CategoriesPersistenceModule } from "@infrastructure/persistence/repositories/categories/categorie-persistence.module";
import { CreateCategoryUsecaseApplication } from "./usecases/create-category-usecase-imp";
import { DeleteCategoryUsecaseApplication } from "./usecases/delete-category-usecase";
import { FindCategoriesUsecaseApplication } from "./usecases/find-categories-usecase";
import { AddCategoryMovieUsecaseImp, DeleteCategoryMovieUsecaseImp } from "./usecases/movies-usecase";
import { CategoriesControllerImp } from "./categories.controller";
import { CategoriesServiceImp} from "./categories.service";

@Module({
  imports: [forwardRef(() => CategoriesPersistenceModule)],
  controllers: [CategoriesControllerImp],
  providers: [
    CategoriesServiceImp,
    CreateCategoryUsecaseApplication,
    DeleteCategoryUsecaseApplication,
    FindCategoriesUsecaseApplication,
    AddCategoryMovieUsecaseImp,
    DeleteCategoryMovieUsecaseImp,
  ],
})
export class CategoriesModule {}
