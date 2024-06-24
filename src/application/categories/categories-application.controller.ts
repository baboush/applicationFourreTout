import { CategoriesController, CategoriesEntity } from "@domain/categories";
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateCategoryUsecaseApplication } from "./usecases/create-category-usecase-application";
import { CreateCategoryDtoApplication } from "./dto/create-category-dto-application";
import { nameCategorySchema } from "@shared/types/category-types";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { DeleteCategoryMovieUsecaseApplication } from "./usecases/movies-usecase/delete-category-movie-usecase-application";
import { DeleteCategoryUsecaseApplication } from "./usecases/delete-category-usecase-application";
import { AddCategoryMovieUsecaseApplication } from "./usecases/movies-usecase/add-category-movie-usecase-application";
import { JwtGuard } from "@application/auth/jwt.guard";
import { FindCategoriesUsecaseApplication } from "./usecases/find-categories-usecase-application";

/**
 * @inheritdoc CategoryiesApplication
 */
@ApiTags("Categories")
//@UseGuards(JwtGuard)
@Controller("categories")
export class CategoriesApplicationController implements CategoriesController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUsecaseApplication,
    private readonly deleteCategoryUsecase: DeleteCategoryUsecaseApplication,
    private readonly addCategoryMovieUsecase: AddCategoryMovieUsecaseApplication,
    private readonly deleteCategoryMovieUsecase: DeleteCategoryMovieUsecaseApplication,
    private readonly findAllCategorySavedUsecase: FindCategoriesUsecaseApplication,
  ) {}

  /**
   * @inheritdocn CategoriesController.handleCreateCategoryAndPublish
   */
  @Post()
  @ApiBody({ type: CreateCategoryDtoApplication })
  async handleCreateCategoryAndPublish(
    @Body() category: CreateCategoryDtoApplication,
  ): Promise<Partial<CategoriesEntity>> {
    const newCategory: CreateCategoryDtoApplication = { ...category };

    if (!newCategory && nameCategorySchema.safeParse(newCategory.name)) {
      throw new BadRequestException(`Category  ${newCategory} bad schema`);
    }

    const createCategory =
      await this.createCategoryUsecase.execute(newCategory);

    return createCategory;
  }

  /**
   * @inheritdoc CategoriesController.handleRemoveCategorySaved
   */
  @Delete(":id")
  async handleRemoveCategorySaved(@Param("id") id: number): Promise<Boolean> {
    const isDelete = await this.deleteCategoryUsecase.execute(id);

    if (!isDelete) {
      throw new BadRequestException(`Category with ID ${id} not found`);
    }

    return !!isDelete;
  }

  /**
   * @inheritdoc CategoriesController.handleAddCategoryToMovieRelation
   */
  @Post("/:idCategory/movie/:idMovie")
  async handleAddCategoryToMovieRelation(
    @Param("idCategory") idCategory: number,
    @Param("idMovie") idMovie: number,
  ): Promise<boolean> {
    const addCategoryToMovie = await this.addCategoryMovieUsecase.execute(
      idMovie,
      idCategory,
    );

    if (!addCategoryToMovie)
      throw new NotFoundException(
        `Category with ID ${idMovie} or Movie with ID ${idCategory} not found`,
      );

    return !!addCategoryToMovie;
  }

  /**
   * @inheritdoc CategoriesController.handleRemoveCategorySaved
   */
  @Delete(":idCategory/movie/:idMovie")
  async handleRemoveCategoryMovieSaved(
    @Param("idCategory") idCategory: number,
    @Param("idMovie") idMovie: number,
  ): Promise<boolean> {
    const isDelete = await this.deleteCategoryMovieUsecase.execute(
      idCategory,
      idMovie,
    );

    if (!isDelete) {
      throw new NotFoundException(
        `Category with ID ${idMovie} or movie with ID ${idCategory} not found`,
      );
    }

    return !!isDelete;
  }

  /**
   * @inheritdoc.CategoriesController.handleFindAllCategorySaved
   */
  @Get("list")
  async handleFindAllCategorySaved(): Promise<CategoriesEntity[]> {
    const result = await this.findAllCategorySavedUsecase.execute();
    return result;
  }
}
