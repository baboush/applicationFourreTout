import { Module, forwardRef } from "@nestjs/common";
import { AuthServiceApplication } from "./auth-application.service";
import { AuthSignInUsecaseApplication } from "./usecases/auth-sign-in-usecase-application";
import { AuthControllerApplication } from "./auth-application.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtApiSecrect } from "./constants";
import { CreateUserUsecaseApplcation } from "./usecases/create-user-usercase-applcation";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { AuthRepositoryModule } from "@infrastructure/persistence/repositories";

@Module({
  imports: [
    forwardRef(() => AuthRepositoryModule),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      global: true,
      secret: jwtApiSecrect.secret,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [
    AuthServiceApplication,
    AuthSignInUsecaseApplication,
    CreateUserUsecaseApplcation,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthControllerApplication],
})
export class AuthApplcationModule {}
