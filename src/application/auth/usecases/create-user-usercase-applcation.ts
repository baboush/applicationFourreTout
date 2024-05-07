import { CreateUserDtoApplication } from "../dto/create-user-dto-application";
import { AuthServiceApplication } from "../auth-application.service";
import { Injectable } from "@nestjs/common";
import { CreateUserUsecase, User } from "@domain/Auth";
@Injectable()
export class CreateUserUsecaseApplcation implements CreateUserUsecase {
  constructor(private readonly authService: AuthServiceApplication) {}
  async execute(createUserDto: CreateUserDtoApplication): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }
}
