import {
  CategoriesEntity,
  CategoriesRepository,
  CreateCategoryDto,
} from "@domain/categories";
import { MovieEntity } from "@domain/movies";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

/**
 * Persistence implementation for the `CategoriesRepository` interface.
 * Handles interactions with the `CategoriesEntity` and related entities
 * within the database using TypeORM.
 */
@Injectable()
export class CategorieRepositoryPersistence implements CategoriesRepository {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
  ) {}

  /**
   * Creates a new category in the database.
   *
   * @param category - The category data to be created.
   * @throws {BadRequestException} if the category already exists or has an invalid format.
   * @returns {Promise<CategoriesEntity>} The created category entity.
   */
  async createCategory(
    category: CreateCategoryDto,
  ): Promise<Partial<CategoriesEntity>> {
    const categoryResponse = { ...category };
    const categoryExisiting = await this.categoriesRepository.findOneBy({
      name: categoryResponse.name,
    });

    if (!!categoryExisiting) {
      throw new BadRequestException(`Category exist in the database`);
    }

    if (!categoryResponse) {
      throw new BadRequestException(`Invalid category format`);
    }

    const createCategory = this.categoriesRepository.create(categoryResponse);
    return await this.categoriesRepository.save(createCategory);
  }

  /**
   * Adds a category to a movie by establishing the ManyToMany relationship.
   *
   * @param idMovie - The ID of the movie to be associated with the category.
   * @param idCategory - The ID of the category to be added to the movie.
   * @throws {NotFoundException} if either the movie or category is not found.
   * @returns {Promise<MovieEntity>} The updated movie entity with the added category.
   */
  async addCategoryMovie(
    idMovie: number,
    idCategory: number,
  ): Promise<boolean> {
    console.log(idCategory);
    const movie = await this.moviesRepository.findOne({
      where: { id: idMovie },
    });
    const category = await this.categoriesRepository.findOne({
      where: { id: idCategory },
    });
    console.log(category + ` category`);
    console.log(movie + `movie`);

    if (!movie) {
      throw new NotFoundException(`Movie ${idMovie} not found`);
    }

    if (!category) {
      throw new NotFoundException(`Category ${idCategory} not found`);
    }

    if (!!movie.categories) {
      movie.categories.push(category);
    } else {
      movie.categories = [];
      movie.categories.push(category);
    }
    console.log(movie.categories);

    const saveCategoryToMovie = await this.moviesRepository.save(movie);
    return !!saveCategoryToMovie;
  }

  /**
   * Removes a category from a movie by modifying the ManyToMany relationship.
   *
   * @param movieId - The ID of the movie from which to remove the category.
   * @param categoryId - The ID of the category to be removed from the movie.
   * @throws {BadRequestException} if either the movie or category is not found.
   * @returns {Promise<boolean>} True if the category was successfully removed, false otherwise.
   */
  async removeCategoryMovie(
    categoryId: number,
    movieId: number,
  ): Promise<boolean> {
    console.log(`${movieId} movieId`);
    const movie = await this.moviesRepository.findOne({
      where: { id: movieId },
      relations: { categories: true },
    });

    if (!movie) {
      throw new BadRequestException(`Movie with ${movieId} not found`);
    }

    const removeCategoryInMovie = movie.categories.find(
      (category) => category.id === +categoryId,
    );

    if (!removeCategoryInMovie) {
      throw new BadRequestException(`Category with ID ${categoryId} not found`);
    }

    const indexCategory = movie.categories.indexOf(removeCategoryInMovie);
    movie.categories.splice(indexCategory, 1);

    await this.moviesRepository.save(movie);
    return !!removeCategoryInMovie;
  }

  /**
   * Removes a category from the database.
   *
   * @param id - The ID of the category to be removed.
   * @throws {NotFoundException} if the category is not found.
   * @returns {Promise<boolean>} True if the category was successfully deleted, false otherwise.
   */
  async removeCategory(id: number): Promise<Boolean> {
    const isExist = await this.categoriesRepository.findOneBy({ id: id });
    const isDelete = await this.categoriesRepository.delete(id);

    if (!isExist) {
      throw new NotFoundException(`Category with ${id} not found`);
    }

    if (!isDelete) {
      throw new NotFoundException(`Category with ${id} not found`);
    }

    return !!isDelete;
  }

  /**
   * @inheritdoc.categoriesRepository.findCategorie
   */
  async findCategories(): Promise<CategoriesEntity[]> {
    const result = await this.categoriesRepository.find();
    if (!result) {
      throw new NotFoundException(`Ressources not found`);
    }
    return result;
  }
}
