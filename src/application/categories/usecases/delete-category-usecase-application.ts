import { DeleteCategory } from "@domain/categories/usecases/delete-category-usecase.interface";
import { Injectable } from "@nestjs/common";
import { CategoryiesApplicationService } from "../categories-application.service";
/**
 * @inheritdoc DeleteCategory
 */
@Injectable()
export class DeleteCategoryUsecaseApplication implements DeleteCategory {
  constructor(
    private readonly categoriesService: CategoryiesApplicationService,
  ) {}

  /**
   * @inheritdoc DeleteCategory.execute
   */
  async execute(id: number): Promise<boolean> {
    const isDelete = await this.categoriesService.removeCategorySaved(id);

    return !!isDelete;
  }
}
