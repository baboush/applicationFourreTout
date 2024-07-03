import {
  AuthRepository,
  CreateUserDto,
  LoginUserDto,
  User,
  UserEntity,
} from "@domain/Auth";
import { ProfileEntity } from "@domain/profiles";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginUser, Password, Username } from "@shared/types/user-type";
import { Repository } from "typeorm";
@Injectable()
export class AuthRepositoryPersistence implements AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async signIn(username: Username, password: Password): Promise<LoginUser> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username })
      .getOne();

    const userValidation: LoginUserDto = {
      username: user.username,
      password: user.password,
    };

    if (!userValidation) {
      throw new NotFoundException(`User: ${userValidation.username} not found`);
    }
    return userValidation;
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    //TODO: validator email et refactory lorsque le repository profile est creer
    const newProfile = new ProfileEntity();
    const profileCreate = this.profileRepository.create(newProfile);
    await this.profileRepository.save(profileCreate);

    const newUser: Partial<User> = {
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email,
      role: createUserDto.role,
      profile: profileCreate,
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
