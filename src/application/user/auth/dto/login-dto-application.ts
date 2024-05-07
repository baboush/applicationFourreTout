import { LoginUserDto } from "@domain/dto";
import { Password, Username } from "@shared/types";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDtoApplication implements LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 80)
  readonly username: Username;

  @IsString()
  @IsNotEmpty()
  @Length(4, 80)
  readonly password: Password;
}
