import { Password, Username } from '@shared/types';

export interface LoginUserDto {
  readonly username: Username;
  readonly password: Password;
}
