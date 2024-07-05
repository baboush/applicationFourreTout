import {
  AbstractUsersEntityService,
  EntityProfile,
} from "@domain/generic/users";
import { AbstractUsersRepository } from "@infrastructure/persistence/repositories/generics/users";
import { Injectable } from "@nestjs/common";
import { DeepPartial } from "typeorm";

@Injectable()
export abstract class AbstractUsersService<T extends EntityProfile>
  implements AbstractUsersEntityService<T>
{
  constructor(private readonly repository: AbstractUsersRepository<T>) {}

  async createEntity(
    createEntity: DeepPartial<T>,
    idProfile: number,
  ): Promise<Partial<T>> {
    return await this.repository.createEntity(idProfile, createEntity);
  }

  async findOneEntity(idEntity: number): Promise<T> {
    return await this.repository.findOneEntity(idEntity);
  }

  async findAllEntities(
    idProfile: number,
    entity: string,
    entityRelation: string,
  ): Promise<T[]> {
    return await this.repository.findAllEntities(
      idProfile,
      entity,
      entityRelation,
    );
  }

  async updateEntity(
    idEntity: number,
    updateEntity: DeepPartial<T>,
    idProfile: number,
  ): Promise<Partial<T>> {
    return await this.repository.updateEntity(
      idEntity,
      updateEntity,
      idProfile,
    );
  }

  async deleteEntity(idEntity: number): Promise<boolean> {
    return await this.repository.deleteEntity(idEntity);
  }
}
