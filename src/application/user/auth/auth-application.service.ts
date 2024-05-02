import { AuthService } from '@domain/services';
import { AuthRepositoryPersistence } from '@infrastructure/persistence/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Username, Password } from '@shared/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServiceApplication implements AuthService {
  constructor(
    private readonly authRepostory: AuthRepositoryPersistence,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: Username,
    password: Password,
  ): Promise<{ access_token: string }> {
    const response = await this.authRepostory.signIn(username, password);

    const salt = await bcrypt.genSalt();
    const passwordResponse = response.password;
    const hash = await bcrypt.hash(passwordResponse, salt);
    const isMatch = await bcrypt.compare(passwordResponse, hash);

    if (!isMatch) {
      throw new UnauthorizedException(`Password is invalid`);
    }
    const payload = { sub: response.id, username: response.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
