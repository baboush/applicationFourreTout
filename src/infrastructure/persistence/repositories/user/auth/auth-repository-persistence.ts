import { User } from '@domain/entities/User.entity';
import { AuthRepository } from '@domain/repositories';
import { LoginUser } from '@shared/types/user-type';
import { LoginUserSchema } from '@shared/schemas';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Username, Password } from '@shared/types';
import { Repository } from 'typeorm';
import { AuthSignInDto } from '@application/user/auth/dto/auth-sign-in-dto';
@Injectable()
export class AuthRepositoryPersistence implements AuthRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //TODO: jwt token bcrypt Password
  //TODO: choisir le type de retour
  async signIn(
    username: Username,
    password: Password,
  ): Promise<LoginUserSchema> {
    console.log(username);
    const response = await this.userRepository
      .createQueryBuilder()
      .where('User.username = :username', { username })
      .getOne();

    const userValidation: AuthSignInDto = {
      username: response.username,
      password: response.password,
    };

    if (!userValidation) {
      throw new NotFoundException(`User: ${userValidation.username} not found`);
    }

    if (userValidation.password !== password) {
      throw new UnauthorizedException(`User password is invalid`);
    }

    return userValidation;
  }
}
