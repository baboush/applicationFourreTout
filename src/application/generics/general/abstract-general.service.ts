import { Entity } from "@domain/generic/base/entity.interface";
import { AbstractGeneralEntityService } from "@domain/generic/general";
import { AbstractGeneralRepository } from "@infrastructure/persistence/repositories/generics/general";
import { Injectable } from "@nestjs/common";
import { DeepPartial } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export abstract class AbstractGeneralService<T extends Entity>
  implements AbstractGeneralEntityService<T>
{
  constructor(private readonly repository: AbstractGeneralRepository<T>) {}

  async createEntity(createEntity: DeepPartial<T>): Promise<Partial<T>> {
    return await this.repository.createEntity(createEntity);
  }

  async findAllEntities(entity: string, entityRelation: string): Promise<T[]> {
    return await this.repository.findAllEntities(entity, entityRelation);
  }

  async findOneEntity(id: number): Promise<T> {
    return await this.repository.findOneEntity(id);
  }

  async updateEntity(
    id: number,
    updateEntity: QueryDeepPartialEntity<T>,
  ): Promise<Partial<T>> {
    return await this.repository.updateEntity(id, updateEntity);
  }

  deleteEntity(id: number): Promise<boolean> {
    return this.repository.deleteEntity(id);
  }
}
