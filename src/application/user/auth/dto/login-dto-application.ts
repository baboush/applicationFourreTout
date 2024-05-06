import { LoginUserDto } from "@domain/dto";
import { Password, Username } from "@shared/types";

export class LoginDtoApplication implements LoginUserDto {
  readonly username: Username;
  readonly password: Password;
}
