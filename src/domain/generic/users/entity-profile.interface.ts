import { ProfileEntity } from "@domain/profiles";
import { Entity } from "../base";

/**
 * This interface extends the Entity interface and adds a profile property.
 * It represents a user entity associated with a profile.
 */
export interface EntityProfile extends Entity {
  /**
   * The profile associated with the user entity.
   */
  profile: ProfileEntity;
}
