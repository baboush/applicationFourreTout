import { LoginUserDto } from '@domain/dto';
import { Password, Username } from '@shared/types';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class AuthSignInDto implements LoginUserDto {
  @IsString()
  @Length(4, 80)
  @Matches(/^[a-zA-Z0-9s]*$/)
  @IsNotEmpty()
  readonly username: Username;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd!@#$%^&*()_+]{8,20}$/,
  )
  @IsNotEmpty()
  readonly password: Password;
}
