import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from '@app/modules/auth/auth.service';
import { AuthResponseInterface } from '@app/modules/auth/types/authResponse.interface';
import { UserLoginDto } from '@app/modules/auth/dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') userLoginDto: UserLoginDto,
  ): Promise<AuthResponseInterface> {
    return await this.authService.login(userLoginDto);
  }

  @Post('/registration')
  @UsePipes(new ValidationPipe())
  async registration(
    @Body('user') userRegistrationDto: UserLoginDto,
  ): Promise<AuthResponseInterface> {
    return await this.authService.registration(userRegistrationDto);
  }
}
