import { Password, Username } from "@shared/types";

export interface AuthSignInUsecase {
  execute(username: Username, password: Password): Promise<any>;
}
