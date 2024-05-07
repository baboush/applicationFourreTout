import { AuthSignInUsecase } from "@domain/usecases";
import { Injectable } from "@nestjs/common";
import { AuthServiceApplication } from "../auth-application.service";
import { User } from "@domain/entities/User.entity";
import { Password, Username } from "@shared/types";
@Injectable()
export class AuthSignInUsecaseApplication implements AuthSignInUsecase {
  constructor(private readonly authService: AuthServiceApplication) {}
  async execute(username: Username, password: Password): Promise<User> {
    return await this.authService.validateUser(username, password);
  }
}
