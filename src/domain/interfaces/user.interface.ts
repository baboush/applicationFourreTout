import { UserRole } from "@application/user/auth/dto/create-user-dto-application";
import { Email, Password, Role, Username } from "@shared/types";

export interface User {
  readonly username: Username;
  readonly password: Password;
  readonly email: Email;
  readonly role: UserRole;
}
