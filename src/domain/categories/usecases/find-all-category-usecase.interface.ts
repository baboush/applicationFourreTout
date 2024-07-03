import { CategoriesEntity } from "..";

/**
 * Find all categories usecase
 *
 * @returns A promise to resolve list categories entity
 */
export interface FindAllCategoryUsecase {
  execute(): Promise<CategoriesEntity[]>;
}
