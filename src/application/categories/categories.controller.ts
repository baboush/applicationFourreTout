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
import { CreateCategoryUsecaseApplication } from "./usecases/create-category-usecase-imp";
import { nameCategorySchema } from "@shared/types/category-types";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { DeleteCategoryUsecaseApplication } from "./usecases/delete-category-usecase";
import { JwtGuard } from "@application/auth/jwt.guard";
import { FindCategoriesUsecaseApplication } from "./usecases/find-categories-usecase";
import { AddCategoryMovieUsecaseImp, DeleteCategoryMovieUsecaseImp } from "./usecases/movies-usecase";

/**
* @inheritdoc CategoryiesController
 */
@ApiTags("Categories")
//@UseGuards(JwtGuard)
@Controller("categories")
export class CategoriesControllerImp implements CategoriesController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUsecaseApplication,
    private readonly deleteCategoryUsecase: DeleteCategoryUsecaseApplication,
    private readonly findAllCategorySavedUsecase: FindCategoriesUsecaseApplication,
    private readonly addCategoryMovieUsecase: AddCategoryMovieUsecaseImp,
    private readonly deleteCategoryMovieUsecase: DeleteCategoryMovieUsecaseImp,
  ) {}

  /**
   * @inheritdocn CategoriesController.handleCreateCategoryAndPublish
   */
  @Post()
  async handleCreateCategoryAndPublish(
    @Body() category: any,
  ): Promise<Partial<CategoriesEntity>> {
    const newCategory: any = { ...category };

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
