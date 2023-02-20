import { DeleteResult } from 'typeorm';

import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";

import { UsersService } from '@app/api/users/users.service';
import { UserCreateDto } from '@app/api/users/dto/user-create.dto';
import { UsersResponseInterface } from '@app/api/users/types/users-response.interface';
import { UserResponseInterface } from '@app/api/users/types/user-response.interface';

import { AuthGuard } from '@app/api/auth/guards/auth.guard';
import { AuthAdminGuard } from '@app/api/auth/guards/auth.admin.guard';
import { AuthAdminOrUser } from '@app/api/auth/guards/auth.admin.or.user.guard';
import {UsersEntity} from "@app/api/users/users.entity";
import { UsersHelper } from "@app/api/users/users.helper";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserUpdateDto } from "@app/api/users/dto/user-update.dto";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersHelper: UsersHelper,
  ) {}

  @ApiOperation({summary: 'Список всех пользователей'})
  @ApiResponse({status: 200, type: [UsersEntity]})
  @Get()
  // @UseGuards(AuthAdminGuard)
  // @UseGuards(AuthGuard)
  async findAll(): Promise<UsersResponseInterface> {
    const users = await this.usersService.findAll();
    return this.usersHelper.buildUsersResponse(users);
  }

  @Get('/:id')
  @ApiOperation({summary: 'Информация о пользователе по его id'})
  @ApiResponse({status: 200, type: UsersEntity})
  @UseGuards(AuthAdminOrUser)
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number): Promise<UserResponseInterface> {
    const user = await this.usersService.findOneBy('id',id);
    return this.usersHelper.buildUserResponse(user);
  }

  @ApiOperation({summary: 'Добавить нового пользователя'})
  @ApiResponse({status: HttpStatus.CREATED, type: UsersEntity})
  @Post()
  @UseGuards(AuthAdminGuard)
  @UseGuards(AuthGuard)
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserResponseInterface> {
    const user: UsersEntity = await this.usersService.create(userCreateDto);
    return this.usersHelper.buildUserResponse(user);
  }
  @ApiOperation({summary: 'Обновить данные пользователя'})
  @ApiResponse({status: HttpStatus.OK, type: UsersEntity})
  @Put('/:id')
  @UseGuards(AuthAdminOrUser)
  @UseGuards(AuthGuard)
  async update(@Param('id') id: number,@Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.update(id, userUpdateDto);
    return this.usersHelper.buildUserResponse(user);
  }

  @ApiOperation({summary: 'Удалить пользователя'})
  @ApiResponse({status: HttpStatus.OK, type: DeleteResult})
  @Delete('/:id')
  @UseGuards(AuthAdminOrUser)
  @UseGuards(AuthGuard)
  async delete(@Param('id') userID: number): Promise<DeleteResult> {
    return await this.usersService.delete(userID);
  }
  @ApiOperation({summary: 'Проверить купил ли пользователь подписку '})
  @ApiResponse({status: HttpStatus.OK, type: Boolean})
  @Get('/:id/subscribed')
  @UseGuards(AuthAdminOrUser)
  @UseGuards(AuthGuard)
  async isUserSubscribed(@Param('id') userID: number): Promise<boolean> {
    return await this.usersService.isUserSubscribed(userID);
  }
}
