import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '@domain/dto';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Role } from '@shared/types';
@ApiTags('Authentification')
export class CreateUserDtoApplication implements CreateUserDto {
  @IsString()
  @Length(4, 80)
  @Matches(/^[a-zA-Z0-9s]*$/)
  @IsNotEmpty()
  @ApiProperty({ description: 'username', type: 'string' })
  readonly username: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd!@#$%^&*()_+]{8,20}$/,
  )
  @ApiProperty({ description: 'password', type: 'string' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'email', type: 'string' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'role', enum: ['user', 'admin', 'contributeur'] })
  readonly role?: Role;
}
