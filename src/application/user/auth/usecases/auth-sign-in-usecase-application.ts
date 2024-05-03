import { AuthSignInUsecase } from '@domain/usecases';
import { Injectable } from '@nestjs/common';
import { AuthServiceApplication } from '../auth-application.service';
import { AuthSignInDto } from '../dto/auth-sign-in.dto';
@Injectable()
export class AuthSignInUsecaseApplication implements AuthSignInUsecase {
  constructor(private readonly authService: AuthServiceApplication) {}
  async execute(
    loginUserDto: AuthSignInDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.signIn(loginUserDto);
  }
}
