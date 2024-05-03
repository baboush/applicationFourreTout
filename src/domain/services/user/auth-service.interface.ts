import { CreateUserDto, LoginUserDto } from '@domain/dto';
import { User } from '@domain/interfaces/user.interface';
import { DeepPartial } from 'typeorm';

export interface AuthService {
  signIn(loginUserDto: LoginUserDto): Promise<{ access_token: string }>;
  signUp(createUserDto: DeepPartial<CreateUserDto>): Promise<User>;
  logOut(): Promise<boolean>;
}
