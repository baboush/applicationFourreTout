import { User } from '@domain/entities/User.entity';
import { AuthRepository } from '@domain/repositories';
import { LoginUser } from '@shared/types/user-type';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AuthSignInDto } from '@application/user/auth/dto/auth-sign-in.dto';
import { LoginUserDto } from '@domain/dto';
import { CreateUserDtoApplication } from '@application/user/auth/dto/create-user-dto-application';
import { Profile } from '@domain/entities/Profile.entity';
@Injectable()
export class AuthRepositoryPersistence implements AuthRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //TODO: Password
  async signIn(loginUserDto: LoginUserDto): Promise<LoginUser> {
    const { username, password } = { ...loginUserDto };
    const response = await this.userRepository
      .createQueryBuilder()
      .where('User.username = :username', { username })
      .getOne();

    const userValidation: AuthSignInDto = {
      id: response.id,
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

  async signUp(
    createUserDto: DeepPartial<CreateUserDtoApplication>,
  ): Promise<User> {
    const profile = new Profile();
    const newUser: CreateUserDtoApplication = {
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email,
      role: createUserDto.role,
      profile: profile,
    };

    console.log(JSON.stringify(newUser));

    if (!newUser) {
      throw new BadRequestException(`Bad request User `);
    }

    const response = this.userRepository.create(newUser);
    const createUser = this.userRepository.save(response);
    return createUser;
  }

  async logOut(): Promise<boolean> {
    return true;
  }
}
