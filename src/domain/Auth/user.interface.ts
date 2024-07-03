import { ProfileEntity } from "@domain/profiles";
import { Email, Password, Role, Username } from "@shared/types";

export interface User {
  readonly username: Username;
  readonly password: Password;
  readonly email: Email;
  readonly role: Role;
  readonly profile: ProfileEntity;
}
