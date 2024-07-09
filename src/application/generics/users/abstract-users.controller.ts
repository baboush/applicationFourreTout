import { DeepPartial } from "typeorm";
import { AbstractUsersService } from "./abstract-users.service";
import {
  AbstractUsersEntityController,
  EntityProfile,
} from "@domain/generic/users";

export class AbstractUsersController<T extends EntityProfile>
  implements AbstractUsersEntityController<T>
{
  constructor(private readonly service: AbstractUsersService<T>) {}

  async createEntity(
    idProfile: number,
    entity: DeepPartial<T>,
  ): Promise<Partial<T>> {
    return await this.service.createEntity(entity, idProfile);
  }
  async updateEntity(
    id: number,
    entity: DeepPartial<T>,
    idProfile: number,
  ): Promise<Partial<T>> {
    return await this.service.updateEntity(id, entity, idProfile);
  }
  async findAllEntities(
    idProfile: number,
    entity: string,
    entityRelation: string,
  ): Promise<T[]> {
    return await this.service.findAllEntities(
      idProfile,
      entity,
      entityRelation,
    );
  }

  async findOneEntity(id: number): Promise<T> {
    return await this.service.findOneEntity(id);
  }

  async deleteEntity(id: number): Promise<boolean> {
    return await this.service.deleteEntity(id);
  }
}
