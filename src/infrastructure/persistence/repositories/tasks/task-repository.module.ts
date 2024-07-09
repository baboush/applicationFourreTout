import { ProfileEntity } from "@domain/profiles";
import { TaskEntity } from "@domain/tasks";
import { Module } from "@nestjs/common";
import { TaskRepositoryPersistence } from "./task-repository-persistence";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ProfileEntity])],
  providers: [TaskRepositoryPersistence],
  exports: [TaskRepositoryPersistence],
})
export class TaskRepositoryModule {}
