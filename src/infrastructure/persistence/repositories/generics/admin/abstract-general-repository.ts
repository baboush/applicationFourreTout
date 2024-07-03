import { AbstractGeneralEntityRepository } from "@domain/generic/general";
import { Entity } from "@domain/generic/base/entity.interface";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export abstract class AbstractGeneralRepository<T extends Entity>
  implements AbstractGeneralEntityRepository<T>
{
  constructor(private readonly entityRepository: Repository<T>) {}

  async createEntity(createEntity: DeepPartial<T>): Promise<Partial<T>> {
    const existEntity = await this.entityRepository.findOne({
      where: createEntity as FindOptionsWhere<T>,
    });

    if (existEntity) throw new BadRequestException("Entity exist in database");

    return await this.entityRepository.save(createEntity);
  }

  async findOneEntity(id: number): Promise<T> {
    const option: FindOptionsWhere<T> = {
      id: id,
    } as FindOptionsWhere<T>;
    const entity = await this.entityRepository.findOneBy(option);

    if (!entity) throw new NotFoundException(`Entity with ${id} not found`);

    return entity;
  }

  async findAllEntities(): Promise<T[]> {
    throw new Error("Method not implemented");
  }

  async updateEntity(
    id: number,
    updateEntity: QueryDeepPartialEntity<T>,
  ): Promise<Partial<T>> {
    const option: FindOptionsWhere<T> = {
      id: id,
    } as FindOptionsWhere<T>;
    const existEntity = await this.entityRepository.findOneBy(option);

    if (!existEntity)
      throw new NotFoundException(`Entity with ${id} not found`);

    await this.entityRepository.update(id, updateEntity);

    return await this.entityRepository.findOneBy(option);
  }

  async deleteEntity(id: number): Promise<boolean> {
    const deleteEntity = await this.entityRepository.delete(id);

    if (deleteEntity.affected === 0)
      throw new NotFoundException(`Movie width ${id} not found`);

    return deleteEntity.affected > 0;
  }
}
