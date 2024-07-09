import { DeepPartial } from "typeorm";
import { BaseController } from "../base";

/**
 * This interface extends the BaseController interface and adds additional methods specific to user entities.
 * Any class that implements this interface must provide implementations for the methods defined in this interface.
 *
 * @template T The type of the user entity.
 */
export interface AbstractUsersEntityController<T> extends BaseController<T> {
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
   * @param profileId The ID of the profile associated with the user entity.
   * @returns A promise that resolves to the updated user entity.
   */
  updateEntity(
    id: number,
    entity: DeepPartial<T>,
    profileId: number,
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
   * @param id The ID of the user entity to find.
   * @returns A promise that resolves to the found user entity.
   */
  findOneEntity(id: number): Promise<T>;
}
