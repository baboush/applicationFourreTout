import { Body, Controller, Post } from '@nestjs/common';
import { AuthController } from '@domain/controllers';
import {
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthSignInUsecaseApplication } from './usecases/auth-sign-in-usecase-application';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { User } from '@domain/entities/User.entity';
import { CreateUserDtoApplication } from './dto/create-user-dto-application';
import { DeepPartial } from 'typeorm';

@ApiTags('Authentification')
@Controller('auth')
export class AuthControllerApplication implements AuthController {
  constructor(
    private readonly authSignIn: AuthSignInUsecaseApplication,
    private readonly authSignUp: AuthSignInUsecaseApplication,
  ) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Réponse réussie' })
  @ApiOperation({ summary: 'Description de signIn' })
  @ApiNotFoundResponse({ description: 'Ressource non trouvée' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne du serveur' })
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<{ access_token: string }> {
    return await this.authSignIn.execute(authSignInDto);
  }
  @Post('signUp')
  async signUp(
    @Body() createUserDto: DeepPartial<CreateUserDtoApplication>,
  ): Promise<User> {
    const newUser = { ...createUserDto };
    return await this.authSignUp.execute(newUser);
  }

  async logOut(): Promise<boolean> {
    return true;
  }
}
