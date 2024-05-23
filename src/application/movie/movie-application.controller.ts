import { JwtGuard } from "@application/auth/jwt.guard";
import { Movie, MovieController, MovieEntity } from "@domain/movies";
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
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { movieSchema } from "@shared/types/movie-types";
import { Paginate, PaginateQuery, Paginated } from "nestjs-paginate";
import { CreateMovieDtoApplication } from "./dto/create-movie-dto-application";
import { ReadMovieDtoApplication } from "./dto/read-movie-dto-application";
import { UpdateMovieDtoApplication } from "./dto/update-movie-dto-application";
import { CreateMoviesUsecaseApplication } from "./usecases/create-movie-usecase-application";
import { DeleteMovieUsecaseApplication } from "./usecases/delete-movie-usecase-application";
import { FindAllMoviesUsecaseApplication } from "./usecases/find-all-movies-usecase-application";
import { ReadMovieUsecaseApplication } from "./usecases/read-movie-usecase-application";
import { UpdateMovieUsecaseApplication } from "./usecases/update-movie-usecase-application";

/**
 * Controller handling movie application logic.
 * This controller interacts with injected use cases to manage movie CRUD operations
 * and exposes them via API endpoints.
 * It's tagged with `@ApiTags('Movie')` to group related API documentation.
 * It requires JWT authentication (`@UseGuards(JwtGuard)`) for all endpoints.
 */
@ApiTags("Movie")
@UseGuards(JwtGuard)
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
  @ApiResponse({ status: 201, description: "Success Create Movie" })
  @ApiOperation({ summary: "Create Movie " })
  @ApiNotFoundResponse({ description: "Ressources not exists" })
  @ApiInternalServerErrorResponse({ description: "Error server" })
  @Post("create")
  async handleCreateAndPublishMovie(
    @Body()
    createMovie: CreateMovieDtoApplication,
  ): Promise<Partial<Movie>> {
    const newMovie: CreateMovieDtoApplication = { ...createMovie };
    const validMovie = movieSchema.safeParse(newMovie);

    if (!newMovie || !validMovie.success) {
      throw new BadRequestException(`${newMovie} Data is missing`);
    }

    return await this.createMovieUsecase.execute(newMovie);
  }

  /**
   * @inheritdoc MovieController.handleFindSavedMoviesListe
   */
  @ApiResponse({ status: 200, description: "Find Movies list pagination" })
  @ApiOperation({ summary: "Find all movies" })
  @ApiNotFoundResponse({ description: "Ressources not exists" })
  @ApiInternalServerErrorResponse({ description: "Error server" })
  @Get("list")
  async handleFindSavedMoviesList(
    @Paginate()
    pagination: PaginateQuery,
  ): Promise<Paginated<MovieEntity>> {
    const moviesPagination = await this.findAllMovieUsecase.execute(pagination);

    if (!moviesPagination) {
      throw new BadRequestException(`Movies with pagination error fetching`);
    }

    return moviesPagination;
  }

  /**
   * @inheritdoc MovieController.handleFindOneSavedMovie
   */
  @ApiResponse({ status: 200, description: "Find One movie" })
  @ApiOperation({ summary: "Find movie" })
  @ApiNotFoundResponse({ description: "Ressources not exists" })
  @ApiInternalServerErrorResponse({ description: "Error server" })
  @Get(":id")
  async handleFindOneSavedMovie(@Param("id") id: number): Promise<Movie> {
    const movie: ReadMovieDtoApplication =
      await this.readOneMovieUsecase.execute(id);
    const validMovie = movieSchema.safeParse(movie);

    if (!movie || !validMovie.success) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  /**
   * @inheritdoc MovieController.handleUpdateMovieDetail
   */
  @ApiResponse({ status: 200, description: "Update Movie" })
  @ApiOperation({ summary: "Update movie" })
  @ApiNotFoundResponse({ description: "Ressources not exists" })
  @ApiInternalServerErrorResponse({ description: "Error server" })
  @Put(":id")
  async handleUpdateMovieDetail(
    @Body()
    updateMovie: UpdateMovieDtoApplication,
  ): Promise<Partial<Movie>> {
    const updatedMovie: UpdateMovieDtoApplication = { ...updateMovie };
    const validMovie = movieSchema.safeParse(updatedMovie);

    if (!updatedMovie.id) {
      throw new NotFoundException(`Movie with ID ${updatedMovie.id} not found`);
    }

    if (!updatedMovie || !validMovie.success) {
      throw new BadRequestException(`Movie update ${updatedMovie} is invalid`);
    }

    return await this.updateMovieUsecase.execute(updatedMovie);
  }

  /**
   * @inheritdoc MovieController.handleDeleteSavedMovie
   */
  @ApiResponse({ status: 200, description: "Delete Movie" })
  @ApiOperation({ summary: "Delete movie" })
  @ApiNotFoundResponse({ description: "Ressources not exists" })
  @ApiInternalServerErrorResponse({ description: "Error server" })
  @ApiParam({
    name: "id",
    required: true,
    type: "number",
    description: "The ID of the movie to delete",
  })
  @Delete(":id")
  async handleDeleteSavedMovie(@Param("id") id: number): Promise<boolean> {
    const isDelete = await this.deleteMovieUsecase.execute(id);

    if (!isDelete) {
      throw new NotFoundException(`Movie with ID ${id} not deleted`);
    }

    return !!isDelete;
  }
}
