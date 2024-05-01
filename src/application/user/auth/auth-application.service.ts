import { LoginUserDto } from '@domain/dto';
import { AuthService } from '@domain/services';
import { AuthRepositoryPersistence } from '@infrastructure/persistence/repositories';
import { Injectable } from '@nestjs/common';
import { Username, Password } from '@shared/types';
import { LoginUser } from '@shared/types/user-type';

@Injectable()
export class AuthServiceApplication implements AuthService {
  constructor(private readonly authRepostory: AuthRepositoryPersistence) {}

  async signIn(username: Username, password: Password): Promise<LoginUser> {
    const response = await this.authRepostory.signIn(username, password);
    return response;
  }
}
