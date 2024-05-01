import { Body, Controller, Post } from '@nestjs/common';
import { AuthController } from '@domain/controllers';
import { LoginUserDto } from '@domain/dto';
import { AuthSignInDto } from './dto/auth-sign-in-dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthSignInUsecaseApplication } from './usecases/auth-sign-in-usecase-application';

@ApiTags('Authentification')
@Controller('auth')
export class AuthControllerApplication implements AuthController {
  constructor(private readonly authSignIn: AuthSignInUsecaseApplication) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Réponse réussie' })
  @ApiOperation({ summary: 'Description de signIn' })
  @ApiNotFoundResponse({ description: 'Ressource non trouvée' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne du serveur' })
  async signIn(@Body() signInDto: AuthSignInDto): Promise<LoginUserDto> {
    return await this.authSignIn.execute(
      signInDto.username,
      signInDto.password,
    );
  }
}
