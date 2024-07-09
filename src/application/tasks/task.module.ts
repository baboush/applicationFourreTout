import { TaskRepositoryModule } from "@infrastructure/persistence/repositories/tasks";
import { Module } from "@nestjs/common";
import { TaskServiceImp } from "./task.service";
import { TaskControllerImp } from "./task.controller";

@Module({
  imports: [TaskRepositoryModule],
  providers: [TaskServiceImp],
  controllers: [TaskControllerImp],
})
export class TaskModule {}
