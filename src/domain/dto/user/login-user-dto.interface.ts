import { Password, Username } from '@shared/types';

export interface LoginUserDto {
  readonly id: number;
  readonly username: Username;
  readonly password: Password;
}
