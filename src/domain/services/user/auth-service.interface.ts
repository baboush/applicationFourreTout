import { Password, Username } from '@shared/types';
import { LoginUser } from '@shared/types/user-type';

export interface AuthService {
  signIn(
    username: Username,
    password: Password,
  ): Promise<LoginUser | undefined>;
}
