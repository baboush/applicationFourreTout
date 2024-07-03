import { DeepPartial } from "typeorm";
import { BaseService } from "../base";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface AbstractGeneralEntityService<T> extends BaseService<T> {
  createEntity(entity: DeepPartial<T>): Promise<Partial<T>>;
  updateEntity(
    id: number,
    entity: QueryDeepPartialEntity<T>,
  ): Promise<Partial<T>>;
  findAllEntity(): Promise<T[]>;
  findOneEntity(id: number): Promise<T>;
}
