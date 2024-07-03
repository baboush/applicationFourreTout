import { LoginUser, Password, Username } from "@shared/types/user-type";
import { DeepPartial } from "typeorm";
import { CreateUserDto } from "./dto";
import { User } from "./user.interface";

export interface AuthRepository {
  signIn(username: Username, password: Password): Promise<LoginUser>;
  signUp(createUserDto: DeepPartial<CreateUserDto>): Promise<User>;
  logOut(): Promise<boolean>;
}
