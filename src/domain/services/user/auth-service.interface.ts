import { CreateUserDto, LoginUserDto } from "@domain/dto";
import { User } from "@domain/interfaces/user.interface";
import { Password, Username } from "@shared/types";
import { DeepPartial } from "typeorm";

export interface AuthService {
  validateUser(username: Username, password: Password): Promise<any>;
  getToken(loginUserDto: LoginUserDto): Promise<{ access_token: string }>;
  signUp(createUserDto: DeepPartial<CreateUserDto>): Promise<User>;
  logOut(): Promise<boolean>;
}
