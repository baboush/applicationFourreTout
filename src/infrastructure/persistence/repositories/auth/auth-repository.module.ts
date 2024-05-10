import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthRepositoryPersistence } from "./auth-repository-persistence";
import { UserEntity } from "@domain/Auth";
import { ProfileEntity } from "@domain/profiles";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  providers: [AuthRepositoryPersistence],
  exports: [AuthRepositoryPersistence],
})
export class AuthRepositoryModule {}
