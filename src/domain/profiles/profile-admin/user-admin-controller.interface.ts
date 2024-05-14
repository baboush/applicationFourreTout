import { BaseProfileController } from "../base";

export interface UserAdminController extends BaseProfileController {
  handleDeleteSavedUser(id: number): Promise<boolean>;
}
