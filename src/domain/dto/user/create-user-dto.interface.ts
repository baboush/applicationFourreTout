import { UserRole } from "@application/user/auth/dto/create-user-dto-application";
import { Profile } from "@domain/entities/Profile.entity";
import { Email, Password, Username } from "@shared/types";

export interface CreateUserDto {
  readonly username?: Username;
  readonly password?: Password;
  readonly email?: Email;
  readonly role?: UserRole;
}
