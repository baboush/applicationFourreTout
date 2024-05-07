import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthServiceApplication } from "./auth-application.service";
import { Password, Username } from "@shared/types";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthServiceApplication) {
    super();
  }

  async validate(username: Username, password: Password): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(`${user} UnauthorizedException`);
    }

    return user;
  }
}
