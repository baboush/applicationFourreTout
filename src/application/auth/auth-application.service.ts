import { AuthRepositoryPersistence } from "@infrastructure/persistence/repositories";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthSignInDto } from "./dto/auth-sign-in.dto";
import { CreateUserDtoApplication } from "./dto/create-user-dto-application";
import { Password, Username } from "@shared/types";
import { AuthService, User } from "@domain/Auth";

@Injectable()
export class AuthServiceApplication implements AuthService {
  constructor(
    private readonly authRepostory: AuthRepositoryPersistence,
    private jwtService: JwtService,
  ) {}

  async getToken(
    loginUserDto: AuthSignInDto,
  ): Promise<{ access_token: string }> {
    if (!loginUserDto) {
      throw new BadRequestException(`${loginUserDto} doesn't exist`);
    }
    const payload = { sub: loginUserDto.id, username: loginUserDto.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: Username, password: Password): Promise<any> {
    const user = await this.authRepostory.signIn(username, password);

    if (!user) {
      throw new UnauthorizedException(`Password invalid`);
    }
    const passwordResponse = user.password;
    const passwordProvided = password;
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
