import { CreateTaskDto, ReadTaskDto, UpdateTaskDto } from "./dto";

/**
 * Interface representing a task service for managing task data in the application.
 * This service likely interacts with a task repository for data persistence.
 */
export interface TasksService {
  /**
   * Creates and publishes a new task.
   *
   * @param createTask A DTO containing data for the new task.
   * @returns A Promise that resolves to a partially populated Task object
   *          representing the created task, or rejects with an error if creation fails.
   */
  createAndPublishTask(
    createTask: CreateTaskDto,
    idProfile: number,
  ): Promise<Partial<CreateTaskDto>>;

  /**
   * Retrieves a paginated list of saved tasks.
   *
   * @returns A Promise that resolves to a list of TaskEntity objects,
   *          or rejects with an error if retrieval fails.
   */
  findSavedTasksList(idProfile: number): Promise<ReadTaskDto[]>;

  /**
   * Finds a single saved task by its ID.
   *
   * @param id The unique identifier of the task to retrieve.
   * @returns A Promise that resolves to a complete Task object,
   *          or rejects with an error if retrieval fails.
   */
  findOneSavedTask(idTask: number): Promise<ReadTaskDto>;

  /**
   * Updates the details of a saved task.
   *
   * @param updateTask A DTO containing data for updating the task.
   * @returns A Promise that resolves to a partially populated Task object
   *          reflecting the update, or rejects with an error if the update fails.
   */
  updateTaskDetail(
    idTask: number,
    updateTask: UpdateTaskDto,
    idProfile: number,
  ): Promise<Partial<UpdateTaskDto>>;

  /**
   * Deletes a saved task by its ID.
   *
   * @param id The unique identifier of the task to delete.
   * @returns A Promise that resolves to true if the deletion is successful,
   *          or false otherwise (likely with an error message).
   */
  deleteSavedTask(id: number): Promise<boolean>;
}
