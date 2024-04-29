import { Email, Password, Role, Ursername } from '@shared/types';

export interface User {
  readonly username: Ursername;
  readonly password: Password;
  readonly email: Email;
  readonly role: Role;
}
