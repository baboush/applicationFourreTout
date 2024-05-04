import { Module, forwardRef } from '@nestjs/common';
import { AuthRepositoryModule } from '@infrastructure/persistence/repositories/user';
import { AuthServiceApplication } from './auth-application.service';
import { AuthSignInUsecaseApplication } from './usecases/auth-sign-in-usecase-application';
import { AuthControllerApplication } from './auth-application.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtApiSecrect } from './constants';
import { CreateUserUsecaseApplcation } from './usecases/create-user-usercase-applcation';

@Module({
  imports: [
    forwardRef(() => AuthRepositoryModule),
    JwtModule.register({
      global: true,
      secret: jwtApiSecrect.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthServiceApplication,
    AuthSignInUsecaseApplication,
    CreateUserUsecaseApplcation,
  ],
  controllers: [AuthControllerApplication],
})
export class AuthApplcationModule {}
