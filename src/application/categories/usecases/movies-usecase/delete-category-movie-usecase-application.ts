import { CategoryiesApplicationService } from "@application/categories/categories-application.service";
import { DeleteCategoryMovieUsecase } from "@domain/categories/usecases/movies-usecase";
import { Injectable } from "@nestjs/common";
/**
 * @inheritdoc DeleteCategoryMovieUsecase
 */
@Injectable()
export class DeleteCategoryMovieUsecaseApplication
  implements DeleteCategoryMovieUsecase
{
  constructor(
    private readonly categoriesService: CategoryiesApplicationService,
  ) {}

  /**
   * @inheritdoc DeleteCategoryMovieUsecase.execute
   */
  async execute(idMovie: number, idCategory: number): Promise<boolean> {
    const isDelete = await this.categoriesService.removeCategoryMovieSaved(
      idMovie,
      idCategory,
    );

    return !!isDelete;
  }
}
