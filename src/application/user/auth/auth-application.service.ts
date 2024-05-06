import { AuthService } from "@domain/services";
import { AuthRepositoryPersistence } from "@infrastructure/persistence/repositories";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthSignInDto } from "./dto/auth-sign-in.dto";
import { CreateUserDtoApplication } from "./dto/create-user-dto-application";
import { User } from "@domain/entities/User.entity";
import { Password, Username } from "@shared/types";
import { LoginDtoApplication } from "./dto/login-dto-application";

@Injectable()
export class AuthServiceApplication implements AuthService {
  constructor(
    private readonly authRepostory: AuthRepositoryPersistence,
    private jwtService: JwtService,
  ) {}

  async getToken(
    loginUserDto: AuthSignInDto,
  ): Promise<{ access_token: string }> {
    const payload = { sub: loginUserDto.id, username: loginUserDto.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(loginUser: LoginDtoApplication): Promise<any> {
    console.log(JSON.stringify(loginUser) + `service`);
    const user = await this.authRepostory.signIn(loginUser);

    if (!user) {
      throw new UnauthorizedException(`Password invalid`);
    }
    console.log(user);
    const passwordResponse = user.password;
    const passwordProvided = loginUser.password;
    const isMatch = await bcrypt.compare(passwordProvided, passwordResponse);

    if (!isMatch) {
      throw new UnauthorizedException(`Password is invalid`);
    }
    return user;
  }

  async signUp(createUserDto: CreateUserDtoApplication): Promise<User> {
    const password = await bcrypt.hash(createUserDto.password, 10);
    const newUser: CreateUserDtoApplication = {
      username: createUserDto.username,
      password: password,
      email: createUserDto.email,
      role: createUserDto.role,
    };
    return await this.authRepostory.signUp(newUser);
  }

  async logOut(): Promise<boolean> {
    return true;
  }
}
