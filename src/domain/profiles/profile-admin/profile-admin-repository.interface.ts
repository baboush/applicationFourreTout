import { BaseProfileRepository } from "../base";

/**
 * Profile Admin Repository
 * @interface ProfileAdminRepository
 * @extends {BaseProfileRepository}
 *
 */
export interface ProfileAdminRepository extends BaseProfileRepository {
  /**
   *  function that deletes a lamda user by ID.
   *
   * @param id (int) The ID of the user to be deleted.
   * @return (boolean) True if the user was deleted successfully, False otherwise.
   */
  deletedUserLambda(id: number): Promise<boolean>;
}
