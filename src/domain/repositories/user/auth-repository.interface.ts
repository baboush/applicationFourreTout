import { Password, Username } from '@shared/types';
import { LoginUser } from '@shared/types/user-type';

export interface AuthRepository {
  signIn(username: Username, password: Password): Promise<LoginUser>;
}
