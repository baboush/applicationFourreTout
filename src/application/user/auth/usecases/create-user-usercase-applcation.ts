import { CreateUserUsecase } from '@domain/usecases';
import { DeepPartial } from 'typeorm';
import { CreateUserDtoApplication } from '../dto/create-user-dto-application';
import { AuthServiceApplication } from '../auth-application.service';
import { Injectable } from '@nestjs/common';
import { User } from '@domain/entities/User.entity';
@Injectable()
export class CreateUserUsecaseApplcation implements CreateUserUsecase {
  constructor(private readonly authService: AuthServiceApplication) {}
  async execute(
    createUserDto: DeepPartial<CreateUserDtoApplication>,
  ): Promise<User> {
    const newUser = { ...createUserDto };
    return await this.authService.signUp(newUser);
  }
}
