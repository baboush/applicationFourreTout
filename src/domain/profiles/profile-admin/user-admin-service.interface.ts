import { BaseProfileService } from "../base";

export interface UserAdminService extends BaseProfileService {
  deleteSavedProfile(id: number): Promise<boolean>;
}
