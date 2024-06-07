import { CategoriesEntity } from "@domain/categories";
import { FindAllCategoryUsecase } from "@domain/categories/usecases";
import { Injectable } from "@nestjs/common";
import { CategoryiesApplicationService } from "../categories-application.service";

/**
 * @inheritdoc.FindAllCategoryUsecase.execute
 */
@Injectable()
export class FindCategoriesUsecaseApplication
  implements FindAllCategoryUsecase
{
  constructor(
    private readonly categoryService: CategoryiesApplicationService,
  ) {}

  async execute(): Promise<CategoriesEntity[]> {
    return await this.categoryService.findAllCategorySaved();
  }
}
