import { CategoryiesApplicationService } from "@application/categories/categories-application.service";
import { AddCategoryMovieUsecase } from "@domain/categories/usecases/movies-usecase";
import { Injectable } from "@nestjs/common";

/**
 * @inheritdoc AddCategoryMovieUsecase
 */
@Injectable()
export class AddCategoryMovieUsecaseApplication
  implements AddCategoryMovieUsecase
{
  constructor(
    private readonly categoriesService: CategoryiesApplicationService,
  ) {}

  /**
   * @inheritdoc AddCategoryMovieUsecase.execute
   */
  async execute(idMovie: number, idCategory: number): Promise<boolean> {
    const isRelationOn =
      await this.categoriesService.addCategoryToMovieRelation(
        idMovie,
        idCategory,
      );
    return !!isRelationOn;
  }
}
