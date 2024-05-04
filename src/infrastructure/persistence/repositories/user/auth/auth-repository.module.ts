import { User } from '@domain/entities/User.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepositoryPersistence } from './auth-repository-persistence';
import { Profile } from '@domain/entities/Profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [AuthRepositoryPersistence],
  exports: [AuthRepositoryPersistence],
})
export class AuthRepositoryModule {}
