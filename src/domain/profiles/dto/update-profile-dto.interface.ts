import { Name, Surname } from "@shared/types";

/**
 * Interface defining the structure of data used for updating profiles.
 */
export interface UpdateProfileDto {
  /**
   * The unique identifier of the profile (read-only, cannot be changed).
   */
  readonly id: number;

  /**
   * The new name of the profile.
   */
  readonly name: Name;

  /**
   * The new surname of the profile.
   */
  readonly surname: Surname;
}
