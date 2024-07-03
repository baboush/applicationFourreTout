import { DeleteCategory } from "@domain/categories/usecases/delete-category-usecase.interface";
import { Injectable } from "@nestjs/common";
import { CategoriesServiceImp,  } from "../categories.service";
/**
 * @inheritdoc DeleteCategory
 */
@Injectable()
export class DeleteCategoryUsecaseApplication implements DeleteCategory {
  constructor(
    private readonly categoriesService: CategoriesServiceImp,
  ) {}

  /**
   * @inheritdoc DeleteCategory.execute
   */
  async execute(id: number): Promise<boolean> {
    const isDelete = await this.categoriesService.removeCategorySaved(id);

    return !!isDelete;
  }
}
