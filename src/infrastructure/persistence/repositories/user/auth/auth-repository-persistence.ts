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
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '@domain/dto';
import { CreateUserDtoApplication } from '@application/user/auth/dto/create-user-dto-application';
@Injectable()
export class AuthRepositoryPersistence implements AuthRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
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
      console.log('caver');
      throw new UnauthorizedException(`User password is invalid`);
    }
    return userValidation;
  }

  async signUp(
    createUserDto: DeepPartial<CreateUserDtoApplication>,
  ): Promise<User> {
    const newUser = { ...createUserDto };

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
