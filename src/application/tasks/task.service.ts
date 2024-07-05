import { AbstractUsersService } from "@application/generics/users";
import { TaskEntity, TasksService } from "@domain/tasks";
import { TaskRepositoryPersistence } from "@infrastructure/persistence/repositories/tasks/task-repository-persistence";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskServiceImp
  extends AbstractUsersService<TaskEntity>
  implements TasksService
{
  constructor(private readonly tasksRepository: TaskRepositoryPersistence) {
    super(tasksRepository);
  }

  async createAndPublishTask(
    createTask: any,
    idProfile: number,
  ): Promise<Partial<TaskEntity>> {
    return await super.createEntity(createTask, idProfile);
  }

  async findOneSavedTask(idTask: number): Promise<TaskEntity> {
    return await super.findOneEntity(idTask);
  }

  async findSavedTasksList(idProfile: number): Promise<TaskEntity[]> {
    return await super.findAllEntities(idProfile, "task", "profile");
  }

  async updateTaskDetail(
    idTask: number,
    updateTask: any,
    idProfile: number,
  ): Promise<Partial<TaskEntity>> {
    return await super.updateEntity(idTask, updateTask, idProfile);
  }

  async deleteSavedTask(idTask: number): Promise<boolean> {
    return await super.deleteEntity(idTask);
  }
}
