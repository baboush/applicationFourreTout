import { ProfileEntity } from "@domain/profiles";
import { TaskEntity, TasksRepository } from "@domain/tasks";
import { CreateTaskDto, ReadTaskDto, UpdateTaskDto } from "@domain/tasks/dto";
import { AbstractUsersRepository } from "@infrastructure/persistence/repositories/generics/users";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TaskRepositoryPersistence
  extends AbstractUsersRepository<TaskEntity>
  implements TasksRepository
{
  readonly entityName: string = "Task";
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepo: Repository<ProfileEntity>,
  ) {
    super(taskRepository, profileRepo);
  }
  /**
   * @inheritdoc MovieRepository.createMovie
   */
  async createTask(
    idProfile: number,
    createTask: CreateTaskDto,
  ): Promise<CreateTaskDto> {
    await super.createEntity(idProfile, createTask);

    return {
      title: createTask.title,
      content: createTask.content,
      dateFinish: createTask.dateFinish,
      state: createTask.state,
    };
  }

  /**
   * @inheritdoc MovieRepository.findAllMovie
   */
  async findAllTasks(idProfile: number): Promise<ReadTaskDto[]> {
    return await super.findAllEntities(idProfile, "task", "profile");
  }

  /**
   * @inheritdoc MovieRepository.findOneMovie
   */
  async findTask(id: number): Promise<ReadTaskDto> {
    return await super.findOneEntity(id);
  }

  /**
   * @inheritdoc MovieRepository.updateMovie
   */
  async updateTask(
    id: number,
    updateMovie: UpdateTaskDto,
    idProfile: number,
  ): Promise<Partial<UpdateTaskDto>> {
    return await super.updateEntity(id, updateMovie, idProfile);
  }

  /**
   * @inheritdoc MovieRepository.deleteMovie
   */
  async deleteTask(id: number): Promise<boolean> {
    return await super.deleteEntity(id);
  }
}
