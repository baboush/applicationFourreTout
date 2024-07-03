import { CategoriesEntity, CreateCategoryUsecase } from "@domain/categories";
import { Injectable } from "@nestjs/common";
import { CategoriesServiceImp } from "../categories.service";

/**
 * @inheritdoc CreateCategoryUsecase
 */
@Injectable()
export class CreateCategoryUsecaseApplication implements CreateCategoryUsecase {
  constructor(
    private readonly categoriesService: CategoriesServiceImp,
  ) {}

  /**
   * @inheritdoc CreateCategoryUsecase.execute
   */
  async execute(
    createCategory: any,
  ): Promise<Partial<CategoriesEntity>> {
    return await this.categoriesService.createCategoryAndPublish(
      createCategory,
    );
  }
}
