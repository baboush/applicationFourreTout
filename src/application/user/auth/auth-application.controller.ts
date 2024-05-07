import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthController } from "@domain/controllers";
import {
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthSignInUsecaseApplication } from "./usecases/auth-sign-in-usecase-application";
import { User } from "@domain/entities/User.entity";
import { CreateUserUsecaseApplcation } from "./usecases/create-user-usercase-applcation";
import { CreateUserDtoApplication } from "./dto/create-user-dto-application";
import { userSchema } from "@shared/schemas";
import { AuthGuard } from "@nestjs/passport";
import { AuthServiceApplication } from "./auth-application.service";
import { AuthSignInDto } from "./dto/auth-sign-in.dto";
import { LoginDtoApplication } from "./dto/login-dto-application";

@ApiTags("Authentification")
@Controller("auth")
export class AuthControllerApplication implements AuthController {
  constructor(
    private readonly authSignIn: AuthSignInUsecaseApplication,
    private readonly authSignUp: CreateUserUsecaseApplcation,
    private readonly service: AuthServiceApplication,
  ) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  @ApiResponse({ status: 200, description: "Réponse réussie" })
  @ApiOperation({ summary: "Description de signIn" })
  @ApiNotFoundResponse({ description: "Ressource non trouvée" })
  @ApiInternalServerErrorResponse({ description: "Erreur interne du serveur" })
  async signIn(
    @Body() loginDto: LoginDtoApplication,
    @Request() req: AuthSignInDto,
  ): Promise<{ access_token: string }> {
    const { username, password } = loginDto;
    if (!username) {
      throw new BadRequestException(`User ${username} is invalide`);
    }

    const user = this.authSignIn.execute(username, password);

    return await this.service.getToken(req);
  }

  @Post("signUp")
  @ApiResponse({ status: 201, description: "Success Create User" })
  @ApiOperation({ summary: "Create User " })
  @ApiNotFoundResponse({ description: "Ressources not exists" })
  @ApiInternalServerErrorResponse({ description: "Error server" })
  async signUp(@Body() createUserDto: CreateUserDtoApplication): Promise<User> {
    let newUser: CreateUserDtoApplication = { ...createUserDto };
    userSchema.parse(newUser);

    return await this.authSignUp.execute(newUser);
  }

  @Get("logOut")
  @ApiResponse({ status: 201, description: "Success Create User" })
  async logOut(): Promise<boolean> {
    console.log("logout");
    return true;
  }
}
