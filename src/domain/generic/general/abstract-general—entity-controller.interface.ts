import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BaseController } from "../base";
import { DeepPartial } from "typeorm";

/**
 * This interface extends the BaseController interface and adds additional methods specific to general entities.
 * Any class that implements this interface must provide implementations for the methods defined in this interface.
 *
 * @template T The type of the entity.
 */
export interface AbstractGeneralEntityController<T> extends BaseController<T> {
  /**
   * Creates a new entity.
   *
   * @param entity The entity to create.
   * @returns A promise that resolves to the created entity.
   */
  createEntity(entity: DeepPartial<T>): Promise<Partial<T>>;

  /**
   * Updates an existing entity.
   *
   * @param id The ID of the entity to update.
   * @param entity The updated entity.
   * @returns A promise that resolves to the updated entity.
   */
  updateEntity(
    id: number,
    entity: QueryDeepPartialEntity<T>,
  ): Promise<Partial<T>>;

  /**
   * Finds all entities.
   *
   * @returns A promise that resolves to an array of all entities.
   */
  findAllEntities(entity: string, entityRelation: string): Promise<T[]>;

  /**
   * Finds one entity by its ID.
   *
   * @param id The ID of the entity to find.
   * @returns A promise that resolves to the found entity.
   */
  findOneEntity(id: number): Promise<T>;
}
