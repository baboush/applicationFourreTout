import { Email, Password, Role, Username } from "@shared/types";

export interface CreateUserDto {
  readonly username?: Username;
  readonly password?: Password;
  readonly email?: Email;
  readonly role?: Role;
}
