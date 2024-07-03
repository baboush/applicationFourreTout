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

@Injectable()
export class CategoriesRepositoryPersistence implements CategoriesRepository {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
  ) {}

  /**
  * @inheritdoc CategoriesRepository.createCategory
   */
  async createCategory(
    category: CreateCategoryDto,
  ): Promise<Partial<CategoriesEntity>> {
    const categoryResponse = { ...category };
    const categoryExisting = await this.categoriesRepository.findOneBy({
      name: categoryResponse.name,
    });

    if (!!categoryExisting)
      throw new BadRequestException(`Category exist in the database`);

    if (!categoryResponse)
      throw new BadRequestException(`Invalid category format`);

    const createCategory = this.categoriesRepository.create(categoryResponse);
    return await this.categoriesRepository.save(createCategory);
  }

  /**
  * @inheritdoc CategoriesRepository.addCategoryMovie
   */
  async addCategoryMovie(
    idMovie: number,
    idCategory: number,
  ): Promise<boolean> {
    const movie = await this.moviesRepository.findOne({
      where: { id: idMovie },
      relations: { categories: true },
    });
    const category = await this.categoriesRepository.findOne({
      where: { id: idCategory },
    });

    if (!movie)
      throw new NotFoundException(`Movie ${idMovie} not found`);

    if (!category)
      throw new NotFoundException(`Category ${idCategory} not found`);

    const existingCategory = [...movie.categories].find(
      (isExist) => isExist.id === category.id,
    );

    if (!!existingCategory)
      throw new BadRequestException(`Category and Movie relationship is on`);

    movie.categories.push(category);

    const saveCategoryToMovie = await this.moviesRepository.save(movie);
    return !!saveCategoryToMovie;
  }

  /**
   * @inheritdoc CategoriesRepository.removeCategoryMovie.
   */
  async removeCategoryMovie(
    categoryId: number,
    movieId: number,
  ): Promise<boolean> {
    const movie = await this.moviesRepository.findOne({
      where: { id: movieId },
      relations: { categories: true },
    });

    if (!movie)
      throw new BadRequestException(`Movie with ${movieId} not found`);

    const removeCategoryInMovie = movie.categories.find(
      (category) => category.id === +categoryId,
    );

    if (!removeCategoryInMovie)
      throw new BadRequestException(`Category with ID ${categoryId} not found`);

    const indexCategory = movie.categories.indexOf(removeCategoryInMovie);
    movie.categories.splice(indexCategory, 1);

    await this.moviesRepository.save(movie);
    return !!removeCategoryInMovie;
  }

  /**
  * @inheritdoc CategoriesRepository.removeCategory
   */
  async removeCategory(id: number): Promise<Boolean> {
    const isExist = await this.categoriesRepository.findOneBy({ id: id });
    const isDelete = await this.categoriesRepository.delete(id);

    if (!isExist)
      throw new NotFoundException(`Category with ${id} not found`);

    if (!isDelete)
      throw new NotFoundException(`Category with ${id} not found`);

    return !!isDelete;
  }

  /**
   * @inheritdoc CategoriesRepository.findCategories
   */
  async findCategories(): Promise<CategoriesEntity[]> {
    const result = await this.categoriesRepository.find();
    if (!result)
      throw new NotFoundException(`Resources not found`);

    return result;
  }
}
