import { DeepPartial } from "typeorm";
import { CreateUserDto, LoginUserDto } from "./dto";
import { User } from "./user.interface";
export interface AuthController {
  signIn(
    loginUserDto: LoginUserDto,
    req: unknown,
  ): Promise<{ access_token: string }>;
  signUp(createUserDto: DeepPartial<CreateUserDto>): Promise<User>;
  logOut(): Promise<boolean>;
}
