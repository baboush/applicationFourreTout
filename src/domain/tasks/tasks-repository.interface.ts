import { TaskEntity } from ".";
import { CreateTaskDto, ReadTaskDto, UpdateTaskDto } from "./dto";

export interface TasksRepository {
  createTask(
    profileId: number,
    createTask: CreateTaskDto,
  ): Promise<Partial<TaskEntity>>;
  findTask(id: number): Promise<ReadTaskDto>;
  findAllTasks(idProfile: number): Promise<ReadTaskDto[]>;
  updateTask(
    id: number,
    createTask: UpdateTaskDto,
    idProfile: number,
  ): Promise<Partial<TaskEntity>>;
  deleteTask(id: number): Promise<boolean>;
}
