import { LoginUserDto } from '@domain/dto';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification')
export class AuthSignInDto implements LoginUserDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

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
  @IsNotEmpty()
  @ApiProperty({ description: 'password', type: 'string' })
  readonly password: string;
}
