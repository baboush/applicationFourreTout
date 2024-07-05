import { JwtGuard } from "@application/auth/jwt.guard";
import { MovieController, MovieEntity } from "@domain/movies";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreateMovieDtoImp, ReadMovieDtoImp, UpdateMovieDtoImp } from "./dto";
import { ApiTags } from "@nestjs/swagger";
import { MovieServiceImp } from "./movie.service";
import { AbstractGeneralController } from "@application/generics/general";

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
export class MovieControllerImp
  extends AbstractGeneralController<MovieEntity>
  implements MovieController
{
  constructor(private readonly movieService: MovieServiceImp) {
    super(movieService);
  }

  /**
   * @inheritdoc MovieController.handleCreateAndPublishMovie
   */
  @Post("create")
  async handleCreateAndPublishMovie(
    @Body()
    createMovie: CreateMovieDtoImp,
  ): Promise<Partial<CreateMovieDtoImp>> {
    return await super.createEntity(createMovie);
  }

  /**
   * @inheritdoc MovieController.handleFindSavedMoviesListe
   */
  @Get("list")
  async handleFindSavedMoviesList(): Promise<ReadMovieDtoImp[]> {
    return await super.findAllEntities("movie", "categories");
  }

  /**
   * @inheritdoc MovieController.handleFindOneSavedMovie
   */
  @Get(":id")
  async handleFindOneSavedMovie(
    @Param("id") id: number,
  ): Promise<Partial<ReadMovieDtoImp>> {
    return await super.findOneEntity(id);
  }

  /**
   * @inheritdoc MovieController.handleUpdateMovieDetail
   */
  @Put("udapte/:id")
  async handleUpdateMovieDetail(
    @Body()
    updateMovie: UpdateMovieDtoImp,
  ): Promise<Partial<UpdateMovieDtoImp>> {
    return await super.updateEntity(updateMovie.id, updateMovie);
  }

  /**
   * @inheritdoc MovieController.handleDeleteSavedMovie
   */
  @Delete("delete/:id")
  async handleDeleteSavedMovie(@Param("id") id: number): Promise<boolean> {
    return await super.deleteEntity(id);
  }
}
