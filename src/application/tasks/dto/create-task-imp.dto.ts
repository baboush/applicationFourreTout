import { State } from "@domain/tasks/Tasks.entity";
import { CreateTaskDto } from "@domain/tasks/dto";
import { ContentTask, TitleTask } from "@shared/types";
import { IsDateString, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTaskDtoImp implements CreateTaskDto {
  @IsString({ message: "title task must be a string" })
  @IsNotEmpty({ message: "title must task be not empty" })
  @Length(10, 60, {
    message: "title task must be between 10 and 60 characters",
  })
  title: TitleTask;

  @IsString({ message: "content task must be a string" })
  @IsNotEmpty({ message: "content task must be not empty" })
  @Length(10, 200, {
    message: "content task must be between 50 and 400 characters",
  })
  content: ContentTask;

  @IsDateString({ strict: true } as any)
  @IsNotEmpty({ message: "date start must be not empty" })
  dateFinish: Date;

  state: State;
}
