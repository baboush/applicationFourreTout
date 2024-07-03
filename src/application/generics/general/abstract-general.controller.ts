import { Entity } from "@domain/generic/base/entity.interface";
import { AbstractGeneralEntityController } from "@domain/generic/general";
import { DeepPartial } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { AbstractGeneralService } from "./abstract-general.service";

export class AbstractGeneralController<T extends Entity>
  implements AbstractGeneralEntityController<T>
{
  constructor(protected readonly service: AbstractGeneralService<T>) {}

  async createEntity(entity: DeepPartial<T>): Promise<Partial<T>> {
    return await this.service.createEntity(entity);
  }
  async updateEntity(
    id: number,
    entity: QueryDeepPartialEntity<T>,
  ): Promise<Partial<T>> {
    return await this.service.updateEntity(id, entity);
  }
  async deleteEntity(id: number): Promise<boolean> {
    return await this.service.deleteEntity(id);
  }

  async findAllEntity(): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  async findOneEntity(id: number): Promise<T> {
    return await this.service.findOneEntity(id);
  }
}
