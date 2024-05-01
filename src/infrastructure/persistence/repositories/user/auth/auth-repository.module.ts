import { User } from '@domain/entities/User.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepositoryPersistence } from './auth-repository-persistence';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthRepositoryPersistence],
  exports: [AuthRepositoryPersistence],
})
export class AuthRepositoryModule {}
