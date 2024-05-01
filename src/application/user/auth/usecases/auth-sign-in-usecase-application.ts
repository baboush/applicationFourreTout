import { LoginUserDto } from '@domain/dto';
import { AuthSignInUsecase } from '@domain/usecases';
import { Username, Password } from '@shared/types';
import { Injectable } from '@nestjs/common';
import { AuthServiceApplication } from '../auth-application.service';
@Injectable()
export class AuthSignInUsecaseApplication implements AuthSignInUsecase {
  constructor(private readonly authService: AuthServiceApplication) {}
  async execute(username: Username, password: Password): Promise<LoginUserDto> {
    return await this.authService.signIn(username, password);
  }
}
