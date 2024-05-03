import { CreateUserDto } from '@domain/dto';
import { User } from '@domain/entities/User.entity';
import { DeepPartial } from 'typeorm';

export interface CreateUserUsecase {
  execute(createUserDto: DeepPartial<CreateUserDto>): Promise<User>;
}
