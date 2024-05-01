import { Email, Password, Username } from '@shared/types';

export interface CreateUserDto {
  readonly username: Username;
  readonly password: Password;
  readonly email: Email;
  readonly role: string;
}
