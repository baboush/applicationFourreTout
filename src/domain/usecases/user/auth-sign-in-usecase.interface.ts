import { Password, Username } from '@shared/types';
import { LoginUser } from '@shared/types/user-type';

export interface AuthSignInUsecase {
  execute(username: Username, password: Password): Promise<LoginUser>;
}
