import { AuthService } from '@domain/services';
import { AuthRepositoryPersistence } from '@infrastructure/persistence/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { DeepPartial } from 'typeorm';
import { CreateUserDtoApplication } from './dto/create-user-dto-application';
import { User } from '@domain/entities/User.entity';
import { Profile } from '@domain/entities/Profile.entity';

@Injectable()
export class AuthServiceApplication implements AuthService {
  constructor(
    private readonly authRepostory: AuthRepositoryPersistence,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: AuthSignInDto): Promise<{ access_token: string }> {
    const response = await this.authRepostory.signIn({ ...loginUserDto });

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

  async signUp(
    createUserDto: DeepPartial<CreateUserDtoApplication>,
  ): Promise<User> {
    console.table(createUserDto + `service`);
    const profile = new Profile();
    const newUser: CreateUserDtoApplication = {
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email,
      role: createUserDto.role,
      profile: profile,
    };
    console.log(JSON.stringify(newUser) + ' service');
    const response = await this.authRepostory.signUp(newUser);

    return response;
  }

  async logOut(): Promise<boolean> {
    return true;
  }
}
