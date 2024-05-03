import { CreateUserDto, LoginUserDto } from '@domain/dto';
import { User } from '@domain/entities/User.entity';
import { LoginUser } from '@shared/types/user-type';
import { DeepPartial } from 'typeorm';

export interface AuthRepository {
  //TODO: remplacer retour LoginUser par un tokent jwt creer un type ?
  signIn(loginUserDto: LoginUserDto): Promise<LoginUser>;
  signUp(createUserDto: DeepPartial<CreateUserDto>): Promise<User>;
  logOut(): Promise<boolean>;
}
