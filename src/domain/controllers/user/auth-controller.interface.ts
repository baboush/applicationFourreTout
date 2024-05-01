import { LoginUserDto } from '@domain/dto';

export interface AuthController {
  signIn(data: LoginUserDto): Promise<LoginUserDto>;
}
