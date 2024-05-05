import { Body, Controller, Post } from "@nestjs/common";
import { AuthController } from "@domain/controllers";
import {
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthSignInUsecaseApplication } from "./usecases/auth-sign-in-usecase-application";
import { AuthSignInDto } from "./dto/auth-sign-in.dto";
import { User } from "@domain/entities/User.entity";
import { CreateUserUsecaseApplcation } from "./usecases/create-user-usercase-applcation";
import { CreateUserDtoApplication } from "./dto/create-user-dto-application";
import { userSchema } from "@shared/schemas";

@ApiTags("Authentification")
@Controller("auth")
export class AuthControllerApplication implements AuthController {
  constructor(
    private readonly authSignIn: AuthSignInUsecaseApplication,
    private readonly authSignUp: CreateUserUsecaseApplcation,
  ) {}

  @Post("login")
  @ApiResponse({ status: 200, description: "Réponse réussie" })
  @ApiOperation({ summary: "Description de signIn" })
  @ApiNotFoundResponse({ description: "Ressource non trouvée" })
  @ApiInternalServerErrorResponse({ description: "Erreur interne du serveur" })
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<{ access_token: string }> {
    return await this.authSignIn.execute(authSignInDto);
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

  async logOut(): Promise<boolean> {
    return true;
  }
}
