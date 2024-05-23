import { CategoriesEntity, CreateCategoryUsecase } from "@domain/categories";
import { Injectable } from "@nestjs/common";
import { CreateCategoryDtoApplication } from "../dto/create-category-dto-application";
import { CategoryiesApplicationService } from "../categories-application.service";

/**
 * @inheritdoc CreateCategoryUsecase
 */
@Injectable()
export class CreateCategoryUsecaseApplication implements CreateCategoryUsecase {
  constructor(
    private readonly categoriesService: CategoryiesApplicationService,
  ) {}

  /**
   * @inheritdoc CreateCategoryUsecase.execute
   */
  async execute(
    createCategory: CreateCategoryDtoApplication,
  ): Promise<Partial<CategoriesEntity>> {
    return await this.categoriesService.createCategoryAndPublish(
      createCategory,
    );
  }
}
