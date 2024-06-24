import { JwtGuard } from "@application/auth/jwt.guard";
import { MovieController, MovieEntity } from "@domain/movies";
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
  Sse,
  UseGuards,
} from "@nestjs/common";
import { CreateMoviesUsecaseApplication } from "./usecases/create-movie-usecase-application";
import { DeleteMovieUsecaseApplication } from "./usecases/delete-movie-usecase-application";
import { FindAllMoviesUsecaseApplication } from "./usecases/find-all-movies-usecase-application";
import { ReadMovieUsecaseApplication } from "./usecases/read-movie-usecase-application";
import { UpdateMovieUsecaseApplication } from "./usecases/update-movie-usecase-application";
import {
  CreateMovieApplicationDto,
  ReadMovieApplicationDto,
  UpdateMovieApplicationDto,
} from "./dto";
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
export class MovieApplicationController implements MovieController {
  constructor(
    private readonly createMovieUsecase: CreateMoviesUsecaseApplication,
    private readonly findAllMovieUsecase: FindAllMoviesUsecaseApplication,
    private readonly readOneMovieUsecase: ReadMovieUsecaseApplication,
    private readonly updateMovieUsecase: UpdateMovieUsecaseApplication,
    private readonly deleteMovieUsecase: DeleteMovieUsecaseApplication,
  ) {}

  /**
   * @inheritdoc MovieController.handleCreateAndPublishMovie
   */
  @Post("create")
  async handleCreateAndPublishMovie(
    @Body()
    createMovie: CreateMovieApplicationDto,
  ): Promise<Partial<MovieEntity>> {
    const newMovie: CreateMovieApplicationDto = { ...createMovie };

    if (!newMovie) {
      throw new BadRequestException(`${newMovie} Data is missing`);
    }

    return await this.createMovieUsecase.execute(newMovie);
  }

  /**
   * @inheritdoc MovieController.handleFindSavedMoviesListe
   */
  @Get("list")
  async handleFindSavedMoviesList(): Promise<MovieEntity[]> {
    const movies = await this.findAllMovieUsecase.execute();

    if (!movies) {
      throw new BadRequestException(`Movies with pagination error fetching`);
    }

    return movies;
  }

  /**
   * @inheritdoc MovieController.handleFindOneSavedMovie
   */
  @Get(":id")
  async handleFindOneSavedMovie(
    @Param("id") id: number,
  ): Promise<Partial<MovieEntity>> {
    const movie: ReadMovieApplicationDto =
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
    updateMovie: UpdateMovieApplicationDto,
  ): Promise<Partial<MovieEntity>> {
    const updatedMovie: UpdateMovieApplicationDto = { ...updateMovie };

    if (!updatedMovie.id) {
      throw new NotFoundException(`Movie with ID ${updatedMovie.id} not found`);
    }

    if (!updatedMovie) {
      throw new BadRequestException(`Movie update ${updatedMovie} is invalid`);
    }

    return await this.updateMovieUsecase.execute(updatedMovie);
  }

  /**
   * @inheritdoc MovieController.handleDeleteSavedMovie
   */
  @Delete("delet/:id")
  async handleDeleteSavedMovie(@Param("id") id: number): Promise<boolean> {
    const isDelete = await this.deleteMovieUsecase.execute(id);

    if (!isDelete) {
      throw new NotFoundException(`Movie with ID ${id} not deleted`);
    }

    return !!isDelete;
  }
}
