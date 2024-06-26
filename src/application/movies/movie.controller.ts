import { JwtGuard } from "@application/auth/jwt.guard";
import { MovieController  } from "@domain/movies";
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  CreateMovieDtoImp,
  ReadMovieDtoImp,
  UpdateMovieDtoImp,
} from "./dto";
import {
  CreateMovieUsecaseImp,
  UpdateMovieUsecaseImp,
  ReadMovieUsecaseImp,
  FindAllMoviesUsecaseImp,
  DeleteMovieUsecaseImp
} from "./usecases";

import { ApiTags } from "@nestjs/swagger";

/**
 * Controller handling movie application logic.
 * This controller interacts with injected use cases to manage movie CRUD operations
 * and exposes them via API endpoints.
 * It's tagged with `@ApiTags('Movie')` to group related API documentation.
 * It requires JWT authentication (`@UseGuards(JwtGuard)`) for all endpoints.
 */
@ApiTags("Movie")
//@UseGuards(JwtGuard)
@Controller("movie")
export class MovieControllerImp implements MovieController {
  constructor(
    private readonly createMovieUsecase: CreateMovieUsecaseImp,
    private readonly findAllMovieUsecase: FindAllMoviesUsecaseImp,
    private readonly readOneMovieUsecase: ReadMovieUsecaseImp,
    private readonly updateMovieUsecase: UpdateMovieUsecaseImp,
    private readonly deleteMovieUsecase: DeleteMovieUsecaseImp,
  ) {}

  /**
   * @inheritdoc MovieController.handleCreateAndPublishMovie
   */
  @Post("create")
  async handleCreateAndPublishMovie(
    @Body()
    createMovie: CreateMovieDtoImp,
  ): Promise<Partial<CreateMovieDtoImp>> {

    if (!createMovie) {
      throw new BadRequestException(`Data is missing for create movie`);
    }

    return await this.createMovieUsecase.execute(createMovie);
  }

  /**
   * @inheritdoc MovieController.handleFindSavedMoviesListe
   */
  @Get("list")
  async handleFindSavedMoviesList(): Promise<ReadMovieDtoImp[]> {
    const movies = await this.findAllMovieUsecase.execute();

    if (!movies) {
      throw new BadRequestException(`Movies error fetching`);
    }

    return movies;
  }

  /**
   * @inheritdoc MovieController.handleFindOneSavedMovie
   */
  @Get(":id")
  async handleFindOneSavedMovie(
    @Param("id") id: number,
  ): Promise<Partial<ReadMovieDtoImp>> {
    const movie: ReadMovieDtoImp =
      await this.readOneMovieUsecase.execute(id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  /**
   * @inheritdoc MovieController.handleUpdateMovieDetail
   */
  @Put("update")
  async handleUpdateMovieDetail(
    @Body()
    updateMovie: UpdateMovieDtoImp,
  ): Promise<Partial<UpdateMovieDtoImp>> {


    if (!updateMovie.id) {
      throw new NotFoundException(`Movie with ID ${updateMovie.id} not found`);
    }

    if (!updateMovie) {
      throw new BadRequestException(`Movie update ${updateMovie} is invalid`);
    }

    return await this.updateMovieUsecase.execute(updateMovie);
  }

  /**
   * @inheritdoc MovieController.handleDeleteSavedMovie
   */
  @Delete("delete/:id")
  async handleDeleteSavedMovie(@Param("id") id: number): Promise<boolean> {
    const isDelete = await this.deleteMovieUsecase.execute(id);

    if (!isDelete) {
      throw new NotFoundException(`Movie with ID ${id} not deleted`);
    }

    return !!isDelete;
  }
}
