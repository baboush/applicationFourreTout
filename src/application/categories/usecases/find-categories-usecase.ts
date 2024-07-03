import { CategoriesEntity } from "@domain/categories";
import { FindAllCategoryUsecase } from "@domain/categories/usecases";
import { Injectable } from "@nestjs/common";
import { CategoriesServiceImp } from "../categories.service";

/**
 * @inheritdoc.FindAllCategoryUsecase.execute
 */
@Injectable()
export class FindCategoriesUsecaseApplication
  implements FindAllCategoryUsecase
{
  constructor(
    private readonly categoryService: CategoriesServiceImp,
  ) {}

  async execute(): Promise<CategoriesEntity[]> {
    return await this.categoryService.findAllCategorySaved();
  }
}
