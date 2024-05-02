import { AuthSignInUsecase } from '@domain/usecases';
import { Username, Password } from '@shared/types';
import { Injectable } from '@nestjs/common';
import { AuthServiceApplication } from '../auth-application.service';
@Injectable()
export class AuthSignInUsecaseApplication implements AuthSignInUsecase {
  constructor(private readonly authService: AuthServiceApplication) {}
  async execute(
    username: Username,
    password: Password,
  ): Promise<{ access_token: string }> {
    return await this.authService.signIn(username, password);
  }
}
