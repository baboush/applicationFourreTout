import {
  AbstractUsersEntitiesRepository,
  EntityProfile,
} from "@domain/generic/users";
import { ProfileEntity } from "@domain/profiles";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from "typeorm";

@Injectable()
export abstract class AbstractUsersRepository<T extends EntityProfile>
  implements AbstractUsersEntitiesRepository<T>
{
  abstract readonly entityName: string;

  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async createEntity(
    idProfile: number,
    createEntity: DeepPartial<T>,
  ): Promise<Partial<T>> {
    const profile = await this.profileRepository.findOneBy({ id: idProfile });

    if (!profile)
      throw new NotFoundException(`Profile with ${idProfile} not found`);

    const existEntity = await this.entityRepository.findOne({
      where: createEntity as FindOptionsWhere<T>,
    });

    if (existEntity)
      throw new BadRequestException(`${this.entityName} exist in database`);

    return await this.entityRepository.save({ ...createEntity, profile });
  }

  async findOneEntity(id: number): Promise<T> {
    const option: FindOneOptions<T> = {
      relations: ["profile"],
      where: { id: id as any },
    };
    const entity = await this.entityRepository.findOne(option);

    if (!entity)
      throw new NotFoundException(`${this.entityName} with ${id} not found`);

    return entity;
  }

  async findAllEntities(
    idProfile: number,
    entity: string,
    entityRelation: string,
  ): Promise<T[]> {
    const profile = await this.profileRepository.findOneBy({ id: idProfile });

    if (!profile)
      throw new NotFoundException(`Profile with ID ${idProfile} not found`);

    const entities = await this.entityRepository
      .createQueryBuilder(entity)
      .leftJoinAndSelect(`${entity}.${entityRelation}`, entityRelation)
      .where("profile.id = :idProfile", { idProfile: idProfile })
      .getMany();

    if (!entities) throw new NotFoundException(`${this.entityName} not found`);

    return entities;
  }

  async updateEntity(
    id: number,
    updateEntity: DeepPartial<T>,
    idProfile: number,
  ): Promise<Partial<T>> {
    const option: FindOptionsWhere<T> = {
      id: id,
    } as FindOptionsWhere<T>;
    const entity = await this.entityRepository.findOneBy(option);
    const profile = await this.profileRepository.findOneBy({ id: idProfile });

    if (!entity)
      throw new NotFoundException(`${this.entityName} with ${id} not found`);

    if (!profile)
      throw new NotFoundException(`Profile with ${idProfile} not found`);

    updateEntity.profile = profile;
    updateEntity.id = id;

    await this.entityRepository.save(updateEntity);

    return await this.entityRepository.findOneBy(option);
  }

  async deleteEntity(id: number): Promise<boolean> {
    const deleteEntity = await this.entityRepository.delete(id);

    if (deleteEntity.affected === 0)
      throw new NotFoundException(`${this.entityName} width ${id} not found`);

    return deleteEntity.affected > 0;
  }
}
