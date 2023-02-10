import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UserCreateDto } from './dto/user-create.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async find(@Param('id') userID: number): Promise<UsersEntity> {
    return await this.usersService.findById(userID);
  }

  @Post()
  async create(@Body('user') userCreateDto: UserCreateDto): Promise<any> {
    return await this.usersService.create(userCreateDto);
  }

  @Put('/:id')
  async update(
    @Param('id') userID: number,
    @Body('user') userUpdateDto: UserCreateDto,
  ): Promise<any> {
    return await this.usersService.update(userID, userUpdateDto);
  }

  @Delete('/:id')
  async delete(@Param('id') userID: number): Promise<any> {
    return await this.usersService.delete(userID);
  }

  @Get(':id/subscription')
  async subscription(@Param('id') userID: number): Promise<any> {
    console.log(userID);
  }
}
