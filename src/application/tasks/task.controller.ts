import { AbstractUsersController } from "@application/generics/users";
import { TaskEntity, TasksController } from "@domain/tasks";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TaskServiceImp } from "./task.service";
import { CreateTaskDtoImp, ReadTaskDtoImp } from "./dto";
import { UpdateTaskDtoImp } from "./dto/update-task-imp.dto";

/**
 * Controller handling Task application logic.
 * This controller interacts with injected use cases to manage Task CRUD operations
 * and exposes them via API endpoints.
 * It's tagged with `@ApiTags('Task')` to group related API documentation.
 * It requires JWT authentication (`@UseGuards(JwtGuard)`) for all endpoints.
 */
@ApiTags("Task")
//@UseGuards(JwtGuard)
@Controller("Task")
export class TaskControllerImp
  extends AbstractUsersController<TaskEntity>
  implements TasksController
{
  constructor(private readonly taskService: TaskServiceImp) {
    super(taskService);
  }

  /**
   * @inheritdoc TaskController.handleCreateAndPublishTask
   */
  @Post("create/:idProfile")
  async handleCreateAndPublishTask(
    @Body()
    createTask: CreateTaskDtoImp,
    @Param("idProfile") idProfile: number,
  ): Promise<Partial<CreateTaskDtoImp>> {
    return await super.createEntity(idProfile, createTask);
  }

  /**
   * @inheritdoc TaskController.handleFindSavedTasksListe
   */
  @Get(":id/list")
  async handleFindSavedTasksList(
    @Param("id") idProfile: number,
  ): Promise<ReadTaskDtoImp[]> {
    return await super.findAllEntities(idProfile, "task", "profile");
  }

  /**
   * @inheritdoc TaskController.handleFindOneSavedTask
   */
  @Get(":id")
  async handleFindOneSavedTask(
    @Param("id") id: number,
  ): Promise<Partial<ReadTaskDtoImp>> {
    return await super.findOneEntity(id);
  }

  /**
   * @inheritdoc TaskController.handleUpdateTaskDetail
   */
  @Put("udapte/:idProfile/:idTask")
  async handleUpdateTaskDetail(
    @Body()
    updateTask: UpdateTaskDtoImp,
    @Param("idProfile") idProfile: number,
    @Param("idTask") idTask: number,
  ): Promise<Partial<UpdateTaskDtoImp>> {
    return await super.updateEntity(idTask, updateTask, idProfile);
  }

  /**
   * @inheritdoc TaskController.handleDeleteSavedTask
   */
  @Delete("delete/:id")
  async handleDeleteSavedTask(@Param("id") id: number): Promise<boolean> {
    return await super.deleteEntity(id);
  }
}
