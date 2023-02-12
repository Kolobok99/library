import { DeleteResult } from 'typeorm';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '@app/modules/users/users.service';
import { UserCreateDto } from '@app/modules/users/dto/user-create.dto';
import { UsersResponseInterface } from '@app/modules/users/types/users-response.interface';
import { UserResponseInterface } from '@app/modules/users/types/user-response.interface';

import { AuthGuard } from '@app/guards/auth.guard';
import { AuthAdminGuard } from '@app/guards/auth.admin.guard';
import { AuthAdminOrUser } from '@app/guards/auth.admin.or.user.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthAdminGuard)
  @UseGuards(AuthGuard)
  async findAll(): Promise<UsersResponseInterface> {
    const users = await this.usersService.findAll();
    return this.usersService.buildUsersResponse(users);
  }

  @Get('/:id')
  @UseGuards(AuthAdminOrUser)
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number): Promise<UserResponseInterface> {
    const user = await this.usersService.findByID(id);
    return this.usersService.buildUserResponse(user);
  }

  @Post()
  @UseGuards(AuthAdminGuard)
  @UseGuards(AuthGuard)
  async create(
    @Body('user') userCreateDto: UserCreateDto,
    @Body('roles') roles: string[],
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.create(userCreateDto, roles);
    return this.usersService.buildUserResponse(user);
  }

  @Put('/:id')
  @UseGuards(AuthAdminOrUser)
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body('user') userUpdateDto: UserCreateDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.update(id, userUpdateDto);
    return this.usersService.buildUserResponse(user);
  }

  @Delete('/:id')
  @UseGuards(AuthAdminOrUser)
  @UseGuards(AuthGuard)
  async delete(@Param('id') userID: number): Promise<DeleteResult> {
    return await this.usersService.delete(userID);
  }

  @Get('/:id/subscribed')
  @UseGuards(AuthAdminOrUser)
  @UseGuards(AuthGuard)
  async isUserSubscribed(@Param('id') userID: number): Promise<boolean> {
    return await this.usersService.isUserSubscribed(userID);
  }
}
