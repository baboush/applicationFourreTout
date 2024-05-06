import { AuthSignInUsecase } from "@domain/usecases";
import { Injectable } from "@nestjs/common";
import { AuthServiceApplication } from "../auth-application.service";
import { AuthSignInDto } from "../dto/auth-sign-in.dto";
import { User } from "@domain/entities/User.entity";
import { LoginDtoApplication } from "../dto/login-dto-application";
@Injectable()
export class AuthSignInUsecaseApplication implements AuthSignInUsecase {
  constructor(private readonly authService: AuthServiceApplication) {}
  async execute(loginDto: LoginDtoApplication): Promise<User> {
    console.log(loginDto);
    return await this.authService.validateUser(loginDto);
  }
}
