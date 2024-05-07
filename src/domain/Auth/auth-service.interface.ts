import { Password, Username } from "@shared/types";
import { DeepPartial } from "typeorm";
import { CreateUserDto, LoginUserDto } from "./dto";
import { User } from "./user.interface";

export interface AuthService {
  validateUser(username: Username, password: Password): Promise<any>;
  getToken(loginUserDto: LoginUserDto): Promise<{ access_token: string }>;
  signUp(createUserDto: DeepPartial<CreateUserDto>): Promise<User>;
  logOut(): Promise<boolean>;
}
