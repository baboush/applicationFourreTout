import { DeepPartial } from "typeorm";
import { BaseRepository } from "../base";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface AbstractGeneralEntityRepository<T> extends BaseRepository<T> {
  createEntity(entity: DeepPartial<T>): Promise<Partial<T>>;
  updateEntity(
    id: number,
    entity: QueryDeepPartialEntity<T>,
  ): Promise<Partial<T>>;
  findOneEntity(id: number): Promise<T>;
}
