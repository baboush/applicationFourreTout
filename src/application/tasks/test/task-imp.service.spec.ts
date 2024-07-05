import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { TaskEntity } from "@domain/tasks";
import { TaskRepositoryPersistence } from "@infrastructure/persistence/repositories/tasks/task-repository-persistence";
import { TaskServiceImp } from "../task.service";
import { CreateTaskDtoImp } from "../dto/create-task-imp.dto";
import { UpdateTaskDtoImp } from "../dto/update-task-imp.dto";
import { State } from "@domain/tasks/Tasks.entity";
import { DeepPartial } from "typeorm";
import { ProfileEntity } from "@domain/profiles";
import { profile } from "console";

describe("TaskApplicationService", () => {
  let service: TaskServiceImp;
  let repo: TaskRepositoryPersistence;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskServiceImp,
        {
          provide: TaskRepositoryPersistence,
          useValue: {
            createEnity: jest.fn(),
            findAllEntities: jest.fn(),
            findOneEntity: jest.fn(),
            updateEntity: jest.fn(),
            deleteEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TaskServiceImp>(TaskServiceImp);
    repo = module.get<TaskRepositoryPersistence>(TaskRepositoryPersistence);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createAndPublishTask", () => {
    it("should throw BadRequestException if Task data is invalid", async () => {
      const task: CreateTaskDtoImp = {} as any;
      const id = 1;

      jest
        .spyOn(repo, "createEntity")
        .mockRejectedValueOnce(new BadRequestException());
      await expect(service.createAndPublishTask(task, id)).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should create a Task if data is valid", async () => {
      const task: CreateTaskDtoImp = {
        title: "The Shawshank Redemption",
        poster: "https://example.com/poster.jpg",
        director: "Frank Darabont",
      } as any;
      const createdTask = {
        title: "The Shawshank Redemption",
        poster: "https://example.com/poster.jpg",
        director: "Frank Darabont",
      } as any;

      const profile = {
        id: 1,
        tasks: [],
      };
      jest.spyOn(repo, "createEntity").mockResolvedValueOnce(createdTask);
      await expect(
        service.createAndPublishTask(task, profile.id),
      ).resolves.toEqual(createdTask);
    });

    describe("findSavedTasksList", () => {
      const profile = {
        id: 1,
      };
      it("should throw NotFoundException if Tasks does not exist", async () => {
        jest
          .spyOn(repo, "findAllEntities")
          .mockRejectedValueOnce(new NotFoundException());
        await expect(service.findSavedTasksList(profile.id)).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should return a list of Tasks", async () => {
        const Tasks = [
          {
            id: 1,
            title: "tache 1",
            content: "The Shawshank Redemption",
            dateFinish: "22 juin",
            state: State.PENDING,
          },
        ] as any;
        const profile: ProfileEntity = {
          id: 1,
          tasks: [Tasks],
        } as any;

        jest.spyOn(repo, "findAllEntities").mockResolvedValueOnce(Tasks);
        await expect(service.findSavedTasksList(profile.id)).resolves.toEqual(
          Tasks,
        );
      });
    });

    describe("findOneSavedTask", () => {
      it("should throw NotFoundException if Task does not exist", async () => {
        const id = 1;
        jest
          .spyOn(repo, "findOneEntity")
          .mockRejectedValueOnce(new NotFoundException());
        await expect(service.findOneSavedTask(id)).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should return a Task if it exists", async () => {
        const profile: ProfileEntity = {
          id: 1,
          lastname: "test",
        } as any;

        const Tasks = [
          {
            id: 1,
            title: "tache 1",
            content: "The Shawshank Redemption",
            dateFinish: "22 juin",
            profile: profile,
            state: State.PENDING,
          },
        ] as any;

        jest.spyOn(repo, "findOneEntity").mockResolvedValueOnce(Tasks);
        await expect(service.findOneSavedTask(1)).resolves.toEqual(Tasks);
      });
    });

    describe("updateTaskDetail", () => {
      it("should throw NotFoundException if Task id is not provided", async () => {
        const Task: UpdateTaskDtoImp = {} as any;
        jest
          .spyOn(repo, "updateEntity")
          .mockRejectedValueOnce(new NotFoundException());
        await expect(service.updateTaskDetail(1, Task, 1)).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should update a Task if data is valid", async () => {
        const Task = {
          id: 1,
          titre: "test",
          content: "test",
          dataFinish: "test",
          profile: 1,
        } as any;
        const updatedTask = {
          id: 1,
          titre: "test2",
          content: "test2",
          dateFinish: "test2",
          profile: 1,
        } as any;

        jest.spyOn(repo, "findOneEntity").mockResolvedValueOnce(Task.id);
        jest.spyOn(repo, "updateEntity").mockResolvedValueOnce(updatedTask);
        await expect(
          service.updateTaskDetail(Task.id, Task, Task.profile),
        ).resolves.toEqual(updatedTask);
      });
    });

    describe("deleteSavedTask", () => {
      it("should throw NotFoundException if Task does not exist", async () => {
        const id = 1;
        jest
          .spyOn(repo, "deleteTask")
          .mockRejectedValueOnce(new NotFoundException());
        await expect(service.deleteSavedTask(0)).rejects.toThrow(
          NotFoundException,
        );
      });

      it("should delete a Task if it exists", async () => {
        const Task = {
          id: 1,
          titre: "test",
          poster: "test",
          director: "test",
        } as any;
        jest.spyOn(repo, "findOneEntity").mockResolvedValueOnce(Task);
        jest.spyOn(repo, "deleteEntity").mockResolvedValueOnce(true);
        await expect(service.deleteSavedTask(Task.id)).resolves.toEqual(true);
      });
    });
  });
});
