import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@app/api/auth/auth.service';
import { AuthResponseInterface } from '@app/api/auth/types/authResponse.interface';
import { UserLoginDto } from '@app/api/auth/dto/user-login.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserRegistrationDto } from "@app/api/auth/dto/user-registration.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'Авторизация'})
  @ApiResponse({status: 201, type: String})
  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<AuthResponseInterface> {
    return await this.authService.login(userLoginDto);
  }

  @ApiOperation({summary: 'Регистрация', description: 'Создает нового пользователя с ролью USER'})
  @ApiResponse({status: 200, type: String})
  @Post('/registration')
  async registration(@Body() userRegistrationDto: UserRegistrationDto): Promise<AuthResponseInterface> {
    return await this.authService.registration(userRegistrationDto);
  }
}
