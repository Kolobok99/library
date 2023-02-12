import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthResponseInterface } from '@app/modules/auth/types/authResponse.interface';

import { UserLoginDto } from '@app/modules/auth/dto/user-login.dto';
import { UsersEntity } from '@app/modules/users/users.entity';
import { UsersService } from '@app/modules/users/users.service';
import { RolesService } from '@app/modules/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly rolesService: RolesService,
    private readonly userService: UsersService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<AuthResponseInterface> {
    const user = await this.userService.findByUserName(userLoginDto.username);
    if (await compare(userLoginDto.password, user.password)) {
      return this.buildAuthResponse(user);
    } else {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async registration(
    userRegistrationDto: UserLoginDto,
  ): Promise<AuthResponseInterface> {
    const user = await this.userService.create(userRegistrationDto, ['ADMIN']);
    return this.buildAuthResponse(user);
  }

  buildAuthResponse(user: UsersEntity): AuthResponseInterface {
    delete user.password;
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  private generateJwt(user: UsersEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        roles: user.roles.map((role) => role.value),
      },
      process.env.SECRET_KEY || 'strong_key',
    );
  }
}
