import { AuthService } from "@domain/services";
import { AuthRepositoryPersistence } from "@infrastructure/persistence/repositories";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthSignInDto } from "./dto/auth-sign-in.dto";
import { CreateUserDtoApplication } from "./dto/create-user-dto-application";
import { User } from "@domain/entities/User.entity";

@Injectable()
export class AuthServiceApplication implements AuthService {
  constructor(
    private readonly authRepostory: AuthRepositoryPersistence,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: AuthSignInDto): Promise<{ access_token: string }> {
    const response = await this.authRepostory.signIn({ ...loginUserDto });

    const passwordResponse = response.password;
    const passwordProvided = loginUserDto.password;
    console.log(passwordProvided);
    const isMatch = await bcrypt.compare(passwordProvided, passwordResponse);

    if (!isMatch) {
      throw new UnauthorizedException(`Password is invalid`);
    }
    const payload = { sub: response.id, username: response.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
