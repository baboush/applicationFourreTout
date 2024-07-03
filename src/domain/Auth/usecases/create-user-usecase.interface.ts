import { DeepPartial } from "typeorm";
import { CreateUserDto } from "../dto";
import { User } from "../user.interface";

export interface CreateUserUsecase {
  execute(createUserDto: DeepPartial<CreateUserDto>): Promise<User>;
}
