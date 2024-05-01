import { Module, forwardRef } from '@nestjs/common';
import { AuthRepositoryModule } from '@infrastructure/persistence/repositories/user';
import { AuthServiceApplication } from './auth-application.service';
import { AuthSignInUsecaseApplication } from './usecases/auth-sign-in-usecase-application';
import { AuthControllerApplication } from './auth-application.controller';

@Module({
  imports: [forwardRef(() => AuthRepositoryModule)],
  providers: [AuthServiceApplication, AuthSignInUsecaseApplication],
  controllers: [AuthControllerApplication],
})
export class AuthApplcationModule {}
