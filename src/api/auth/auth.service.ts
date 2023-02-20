import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthResponseInterface } from '@app/api/auth/types/authResponse.interface';

import { UserLoginDto } from '@app/api/auth/dto/user-login.dto';
import { UsersService } from '@app/api/users/users.service';
import { RolesService } from '@app/api/roles/roles.service';
import { AuthHelper } from "@app/api/auth/auth.helper";
import { UserCreateDto } from "@app/api/users/dto/user-create.dto";
import { UserRegistrationDto } from "@app/api/auth/dto/user-registration.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly rolesService: RolesService,
    private readonly userService: UsersService,
    private readonly authHelper: AuthHelper,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<AuthResponseInterface> {
    const user = await this.userService.findOneBy('username', userLoginDto.username);
    if (this.authHelper.isCorrectPassword(userLoginDto.password, user.password)) {
      return this.authHelper.buildAuthResponse(user);
    } else {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async registration(userRegistrationDto: UserRegistrationDto): Promise<AuthResponseInterface> {
    const user = await this.userService.create(userRegistrationDto);
    return this.authHelper.buildAuthResponse(user);
  }
}
