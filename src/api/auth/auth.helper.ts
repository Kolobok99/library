import { UsersEntity } from "@app/api/users/users.entity";
import { AuthResponseInterface } from "@app/api/auth/types/authResponse.interface";
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcrypt  from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { Inject } from "@nestjs/common";

export class AuthHelper {
  constructor(
    @Inject(ConfigService)  private config: ConfigService) {

  }

  isCorrectPassword(tempPassword: string, correctPassword: string): boolean {
    return bcrypt.compareSync(tempPassword, correctPassword)
  }
  async decode(token: string) {
    return jsonwebtoken.verify(token, this.config.get('SECRET_KEY'))
  }

  buildAuthResponse(user: UsersEntity): AuthResponseInterface {
    return {
      user: {
        id: user.id,
        username: user.username,
        roles: user.roles,
        token: this.generateJwt(user)
      }
    };
  }

  private generateJwt(user: UsersEntity): string {
    return jsonwebtoken.sign(
      {
        id: user.id,
        username: user.username,
        roles: user.roles.map((role) => role.value),
      },
      this.config.get('SECRET_KEY'),
    );
  }
}