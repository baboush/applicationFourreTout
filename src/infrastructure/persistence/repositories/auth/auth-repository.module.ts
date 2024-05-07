import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthRepositoryPersistence } from "./auth-repository-persistence";
import { Profile } from "@domain/entities/Profile.entity";
import { UserEntity } from "@domain/Auth";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, Profile])],
  providers: [AuthRepositoryPersistence],
  exports: [AuthRepositoryPersistence],
})
export class AuthRepositoryModule {}
