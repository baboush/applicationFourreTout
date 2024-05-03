import { LoginUserDto } from '@domain/dto';

export interface AuthSignInUsecase {
  execute(loginUserDto: LoginUserDto): Promise<{ access_token: string }>;
}
