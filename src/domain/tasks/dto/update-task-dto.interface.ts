import { State } from "../Tasks.entity";

/**
 * Interface representing a DTO (Data Transfer Object) used to create a new movie.
 */
export interface UpdateTaskDto {
  /**
   * ID of the task.
   */
  readonly id: number;

  /**
   * Title of the task.
   */
  readonly title: string;

  /**
   * Content of the task.
   */
  readonly content: string;

  /**
   * Date finish task.
   */
  readonly dateFinish: Date;

  /**
   * State of the task.
   */
  readonly state: State;
}
