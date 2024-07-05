import { DeepPartial } from "typeorm";
import { BaseService } from "../base";

/**
 * This interface extends the BaseService interface and adds additional methods specific to user entities.
 * Any class that implements this interface must provide implementations for the methods defined in this interface.
 *
 * @template T The type of the user entity.
 */
export interface AbstractUsersEntityService<T> extends BaseService<T> {
  /**
   * Creates a new user entity.
   *
   * @param entity The user entity to create.
   * @param idProfile The ID of the profile associated with the user entity.
   * @returns A promise that resolves to the created user entity.
   */
  createEntity(entity: DeepPartial<T>, idProfile: number): Promise<Partial<T>>;

  /**
   * Updates an existing user entity.
   *
   * @param idEntity The ID of the user entity to update.
   * @param entity The updated user entity.
   * @param idProfile The ID of the profile associated with the user entity.
   * @returns A promise that resolves to the updated user entity.
   */
  updateEntity(
    idEntity: number,
    entity: DeepPartial<T>,
    idProfile: number,
  ): Promise<Partial<T>>;

  /**
   * Finds all user entities associated with a specific profile.
   *
   * @param profileId The ID of the profile.
   * @returns A promise that resolves to an array of all user entities associated with the profile.
   */
  findAllEntities(
    idProfile: number,
    entity: string,
    entityRelation: string,
  ): Promise<T[]>;

  /**
   * Finds one user entity by its ID.
   *
   * @param idEntity The ID of the user entity to find.
   * @returns A promise that resolves to the found user entity.
   */
  findOneEntity(idEntity: number): Promise<T>;
}
