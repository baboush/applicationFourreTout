import { DeepPartial } from "typeorm";
import { BaseRepository } from "../base";
import { EntityProfile } from "./entity-profile.interface";

/**
 * This interface extends the BaseRepository interface and adds additional methods specific to user entities.
 * Any class that implements this interface must provide implementations for the methods defined in this interface.
 *
 * @template T The type of the user entity, which must extend EntityProfile.
 */
export interface AbstractUsersEntitiesRepository<T extends EntityProfile>
  extends BaseRepository<T> {
  /**
   * A readonly string that represents the name of the user entity.
   */
  readonly entityName: string;

  /**
   * Creates a new user entity.
   *
   * @param idProfile The ID of the profile associated with the user entity.
   * @param entity The user entity to create.
   * @returns A promise that resolves to the created user entity.
   */
  createEntity(idProfile: number, entity: DeepPartial<T>): Promise<Partial<T>>;

  /**
   * Updates an existing user entity.
   *
   * @param id The ID of the user entity to update.
   * @param entity The updated user entity.
   * @param idProfile The ID of the profile associated with the user entity.
   * @returns A promise that resolves to the updated user entity.
   */
  updateEntity(
    id: number,
    entity: DeepPartial<T>,
    idProfile: number,
  ): Promise<Partial<T>>;

  /**
   * Finds one user entity by its ID and the ID of its associated profile.
   *
   * @param idProfile The ID of the profile associated with the user entity.
   * @param idTask The ID of the user entity to find.
   * @returns A promise that resolves to the found user entity.
   */
  findOneEntity(idProfile: number, idTask: number): Promise<T>;

  /**
   * Finds all user entities associated with a specific profile.
   *
   * @param entity name of entity.
   * @param entityRelation name of entity relation
   * @returns A promise that resolves to an array of all user entities associated with the profile.
   */
  findAllEntities(
    idProfile: number,
    entity: string,
    entityRelation: string,
  ): Promise<T[]>;
}
