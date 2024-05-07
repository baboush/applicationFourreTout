import { CreateUserDto, LoginUserDto } from "@domain/dto";
import { User } from "@domain/entities/User.entity";
import { DeepPartial } from "typeorm";
export interface AuthController {
  signIn(
    loginUserDto: LoginUserDto,
    req: unknown,
  ): Promise<{ access_token: string }>;
  signUp(createUserDto: DeepPartial<CreateUserDto>): Promise<User>;
  logOut(): Promise<boolean>;
}
