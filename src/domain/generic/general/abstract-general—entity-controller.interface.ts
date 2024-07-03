import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BaseController } from "../base";
import { DeepPartial } from "typeorm";

export interface AbstractGeneralEntityController<T> extends BaseController<T> {
  createEntity(entity: DeepPartial<T>): Promise<Partial<T>>;
  updateEntity(
    id: number,
    entity: QueryDeepPartialEntity<T>,
  ): Promise<Partial<T>>;
  findAllEntity(): Promise<T[]>;
  findOneEntity(id: number): Promise<T>;
}
