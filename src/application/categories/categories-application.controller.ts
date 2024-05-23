import {
  AddCategoryMovieDto,
  CategoriesController,
  CategoriesEntity,
  CreateCategoryDto,
} from "@domain/categories";
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { CreateCategoryUsecaseApplication } from "./usecases/create-category-usecase-application";
import { CreateCategoryDtoApplication } from "./dto/create-category-dto-application";
import { nameCategorySchema } from "@shared/types/category-types";
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { DeleteCategoryMovieUsecaseApplication } from "./usecases/movies-usecase/delete-category-movie-usecase-application";
import { DeleteCategoryUsecaseApplication } from "./usecases/delete-category-usecase-application";
import { AddCategoryMovieUsecaseApplication } from "./usecases/movies-usecase/add-category-movie-usecase-application";

/**
 * @inheritdoc CategoryiesApplication
 */
@ApiTags("Categories")
@Controller("categories")
export class CategoriesApplicationController implements CategoriesController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUsecaseApplication,
    private readonly deleteCategoryUsecase: DeleteCategoryUsecaseApplication,
    private readonly addCategoryMovieUsecase: AddCategoryMovieUsecaseApplication,
    private readonly deleteCategoryMovieUsecase: DeleteCategoryMovieUsecaseApplication,
  ) {}

  /**
   * @inheritdocn CategoriesController.handleCreateCategoryAndPublish
   */
  @Post()
  @ApiBody({ type: CreateCategoryDtoApplication })
  @ApiCreatedResponse({ type: CategoriesEntity })
  @ApiConflictResponse({
    description: "Category with the same name already exists",
  })
  @ApiBadRequestResponse({ description: "Invalid category data" })
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
  @ApiOkResponse({
    description: "Category removed successfully from the movie.",
  })
  @ApiNotFoundResponse({ description: "Movie or category not found." })
  @Post("/:idCategory/movie/:idMovie")
  async handleAddCategoryToMovieRelation(
    @Param("idCategory") idCategory: number,
    @Param("idMovie") idMovie: number,
  ): Promise<boolean> {
    console.log(idCategory + `controller`);
    const addCategoryToMovie = await this.addCategoryMovieUsecase.execute(
      idMovie,
      idCategory,
    );

    if (!addCategoryToMovie) {
      throw new NotFoundException(
        `Category with ID ${idMovie} or Movie with ID ${idCategory} not found`,
      );
    }

    return !!addCategoryToMovie;
  }

  /**
   * @inheritdoc CategoriesController.handleRemoveCategorySaved
   */
  @ApiOkResponse({
    description: "Category removed successfully from the movie.",
  })
  @ApiNotFoundResponse({ description: "Movie or category not found." })
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
}
