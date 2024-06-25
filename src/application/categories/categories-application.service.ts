import { CategoriesEntity, CategoriesService } from "@domain/categories";
import { CategoriesRepositoryPersistence } from "@infrastructure/persistence/repositories/categories";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCategoryDtoApplication } from "./dto/create-category-dto-application";

/**
 * @inheritdoc CategoriesServic
 */
@Injectable()
export class CategoryiesApplicationService implements CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepositoryPersistence,
  ) {}

  /**
   * @inheritdoc CategoriesService.createCategoryAndPublish
   */
  async createCategoryAndPublish(
    category: CreateCategoryDtoApplication,
  ): Promise<Partial<CategoriesEntity>> {
    const newCategory =
      await this.categoriesRepository.createCategory(category);

    if (!newCategory || Object.keys(newCategory).length === 0)
      throw new BadRequestException(`Category ${category} bad schema`);

    return newCategory;
  }

  /**
   * @inheritdoc CategoriesService.removeCategorySaved
   */
  async removeCategorySaved(id: number): Promise<Boolean> {
    const isDelete = this.categoriesRepository.removeCategory(id);

    if (!isDelete)
      throw new NotFoundException(`Category with ID ${id} not found`);

    return !!isDelete;
  }

  /**
   * @inheritdoc CategoriesService.addCategoryToMovieRelation
   */
  async addCategoryToMovieRelation(
    idMovie: number,
    idCategory: number,
  ): Promise<boolean> {
    const addCategoryToMovie = await this.categoriesRepository.addCategoryMovie(
      idMovie,
      idCategory,
    );

    if (!addCategoryToMovie)
      throw new BadRequestException(`Category not found`);

    return !!addCategoryToMovie;
  }

  /**
   * @inheritdoc CategoriesService.removeCategoryMovieSaved
   */
  async removeCategoryMovieSaved(
    idMovie: number,
    idCategory: number,
  ): Promise<boolean> {
    const isDelete = await this.categoriesRepository.removeCategoryMovie(
      idMovie,
      idCategory,
    );

    if (!isDelete) 
      throw new NotFoundException(`Category with ID ${idCategory} or Movie with ID ${idMovie} not found `);

    return !!isDelete;
  }

  /**
   * @inheritdoc CategoriesService.findAllCategorySaved
   */
  async findAllCategorySaved(): Promise<CategoriesEntity[]> {
    const result = await this.categoriesRepository.findCategories();

    if (!result)
      throw new NotFoundException(`Resources not found`);

    return result;
  }
}
