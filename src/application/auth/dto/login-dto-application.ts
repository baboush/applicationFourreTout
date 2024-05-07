import { LoginUserDto } from "@domain/Auth";
import { ApiProperty } from "@nestjs/swagger";
import { Password, Username } from "@shared/types";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDtoApplication implements LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 80)
  @ApiProperty({ description: "Username login", type: "Username" })
  readonly username: Username;

  @IsString()
  @IsNotEmpty()
  @Length(4, 80)
  @ApiProperty({ description: "Password login", type: "Password" })
  readonly password: Password;
}
