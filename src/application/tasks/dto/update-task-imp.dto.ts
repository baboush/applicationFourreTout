import { State } from "@domain/tasks/Tasks.entity";
import { UpdateTaskDto } from "@domain/tasks/dto";
import { ContentTask, TitleTask } from "@shared/types";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from "class-validator";

export class UpdateTaskDtoImp implements UpdateTaskDto {
  @IsNumber()
  id: number;

  @IsString({ message: "title task must be a string" })
  @IsNotEmpty({ message: "title must task be not empty" })
  @Length(10, 50, {
    message: "title task must be between 10 and 50 characters",
  })
  title: TitleTask;

  @IsString({ message: "content task must be a string" })
  @IsNotEmpty({ message: "content task must be not empty" })
  @Length(50, 400, { message: "content task must be between 50 and 400" })
  content: ContentTask;

  @IsDate()
  @IsNotEmpty({ message: "date start must be not empty" })
  dateFinish: Date;

  @IsNotEmpty({ message: "state must be not empty" })
  state: State;
}
