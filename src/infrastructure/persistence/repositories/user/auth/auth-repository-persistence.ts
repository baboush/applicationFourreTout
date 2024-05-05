import { User } from "@domain/entities/User.entity";
import { AuthRepository } from "@domain/repositories";
import { LoginUser } from "@shared/types/user-type";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthSignInDto } from "@application/user/auth/dto/auth-sign-in.dto";
import { LoginUserDto } from "@domain/dto";
import { CreateUserDtoApplication } from "@application/user/auth/dto/create-user-dto-application";
import { Profile } from "@domain/entities/Profile.entity";
@Injectable()
export class AuthRepositoryPersistence implements AuthRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  //TODO: Password
  async signIn(loginUserDto: LoginUserDto): Promise<LoginUser> {
    const { username, password } = { ...loginUserDto };
    const response = await this.userRepository
      .createQueryBuilder()
      .where("User.username = :username", { username })
      .getOne();

    const userValidation: AuthSignInDto = {
      id: response.id,
      username: response.username,
      password: response.password,
    };

    if (!userValidation) {
      throw new NotFoundException(`User: ${userValidation.username} not found`);
    }
    return userValidation;
  }

  async signUp(createUserDto: CreateUserDtoApplication): Promise<User> {
    //TODO: validator email et refactory lorsque le repository profile est creer
    const newProfile = new Profile();
    const profileAdd = this.profileRepository.create(newProfile);
    await this.profileRepository.save(profileAdd);

    const newUser: Partial<User> = {
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email,
      role: createUserDto.role,
      profile: profileAdd,
    };

    const response = this.userRepository.create(newUser);
    if (!newUser) {
      throw new BadRequestException(`Bad request User `);
    }

    const createUser = await this.userRepository.save(response);
    return createUser;
  }

  async logOut(): Promise<boolean> {
    return true;
  }
}
