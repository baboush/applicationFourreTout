import { CreateTaskDto } from "@domain/tasks/dto";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDtoImp implements CreateTaskDto {
  @IsString({ message: "title task must be a string" })
  @IsNotEmpty({ message: "title must task be not empty" })
  title: string;

  content: string;

  dateFinish: string;
}
