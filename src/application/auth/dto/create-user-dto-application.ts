import { ApiTags, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { Email, Password, Role, Username } from "@shared/types";
import { CreateUserDto } from "@domain/Auth";

export enum UserRole {
  Admin = "ADMIN",
  Moderator = "MODERATOR",
  User = "USER",
}
@ApiTags("Authentification")
export class CreateUserDtoApplication implements CreateUserDto {
  @IsString()
  @Length(4, 80)
  @Matches(/^[a-zA-Z0-9s]*$/)
  @IsNotEmpty()
  @ApiProperty({ description: "username", type: "string" })
  readonly username?: Username;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/)
  @ApiProperty({ description: "password", type: "string" })
  readonly password?: Password;

  @IsNotEmpty()
  @ApiProperty({ description: "email", type: "string" })
  readonly email?: Email;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "role", enum: ["USER", "ADMIN", "CONTRIBUTEUR"] })
  readonly role?: Role;
}
