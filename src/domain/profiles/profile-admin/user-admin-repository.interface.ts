import { BaseProfileRepository } from "../base";

export interface UserAdminRepository extends BaseProfileRepository {
  deletedUser(id: number): Promise<boolean>;
}
