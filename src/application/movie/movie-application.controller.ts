import { Movie, MovieController } from "@domain/movies";
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
} from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateMovieDtoApplication } from "./dto/create-movie-dto-application";
import { UpdateMovieDtoApplication } from "./dto/update-movie-dto-application";
import { CreateMoviesUsecaseApplication } from "./usecases/create-movie-usecase-application";
import { FindAllMoviesUsecaseApplication } from "./usecases/find-all-movies-usecase-application";
import { ListMoviesDtoApplication } from "./dto/list-movies-dto-application";
import { ReadMovieUsecaseApplication } from "./usecases/read-movie-usecase-application";
import { ReadMovieDtoApplication } from "./dto/read-movie-dto-application";
import { UpdateMovieUsecaseApplication } from "./usecases/update-movie-usecase-application";
import { DeleteMovieUsecaseApplication } from "./usecases/delete-movie-usecase-application";

@ApiTags("Movie")
@Controller("movie")
export class MovieApplicationController implements MovieController {
  constructor(
    private readonly createMovieUsecase: CreateMoviesUsecaseApplication,
    private readonly findAllMovieUsecase: FindAllMoviesUsecaseApplication,
    private readonly readOneMovieUsecase: ReadMovieUsecaseApplication,
    private readonly updateMovieUsecase: UpdateMovieUsecaseApplication,
    private readonly deleteMovieUsecase: DeleteMovieUsecaseApplication,
  ) {}

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

    if (!newMovie) {
      throw new BadRequestException(`${newMovie} Data is missing`);
    }

    return await this.createMovieUsecase.execute(newMovie);
  }

  //TODO: pagination nestjs pagination library
  @ApiResponse({ status: 201, description: "Find Movies list pagination" })
  @ApiOperation({ summary: "Find all movies" })
  @ApiNotFoundResponse({ description: "Ressources not exists" })
  @ApiInternalServerErrorResponse({ description: "Error server" })
  @Get("list")
  async handleFindSavedMoviesList(
    @Body()
    pagination: any,
  ): Promise<ListMoviesDtoApplication> {
    return await this.findAllMovieUsecase.execute(pagination);
  }

  @ApiResponse({ status: 201, description: "Find One movie" })
  @ApiOperation({ summary: "Find movie" })
  @ApiNotFoundResponse({ description: "Ressources not exists" })
  @ApiInternalServerErrorResponse({ description: "Error server" })
  @Get(":id")
  async handleFindOneSavedMovie(@Param("id") id: number): Promise<Movie> {
    const movie: ReadMovieDtoApplication =
      await this.readOneMovieUsecase.execute(id);

    if (!movie) {
      throw new NotFoundException(`${movie} Doesn's exist in database`);
    }
    return movie;
  }

  //TODO: update function with id
  @ApiResponse({ status: 201, description: "Update Movie" })
  @ApiOperation({ summary: "Update movie" })
  @ApiNotFoundResponse({ description: "Ressources not exists" })
  @ApiInternalServerErrorResponse({ description: "Error server" })
  @Put(":id")
  async handleUpdateMovieDetail(
    @Param("id")
    @Body()
    updateMovie: UpdateMovieDtoApplication,
  ): Promise<Partial<Movie>> {
    const updatedMovie: UpdateMovieDtoApplication = { ...updateMovie };
    console.log(updatedMovie);

    if (updatedMovie) {
      throw new BadRequestException(`${updatedMovie} Data is missing`);
    }

    return await this.updateMovieUsecase.execute(updatedMovie);
  }

  @ApiResponse({ status: 201, description: "Delete Movie" })
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
    const isDeleted = true;
    const movie = await this.readOneMovieUsecase.execute(id);
    if (!movie) {
      throw new NotFoundException(`${movie} Doesn't exist in database `);
    }
    await this.deleteMovieUsecase.execute(id);
    return isDeleted;
  }
}
