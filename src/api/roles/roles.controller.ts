import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";

import { RoleCreateDto } from '@app/api/roles/dto/role-create.dto';
import { RolesService } from '@app/api/roles/roles.service';
import { RolesEntity } from '@app/api/roles/roles.entity';

import { AuthGuard } from '@app/api/auth/guards/auth.guard';
import { AuthAdminGuard } from '@app/api/auth/guards/auth.admin.guard';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  // @UseGuards(AuthAdminGuard)
  // @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body('role') roleCreateDto: RoleCreateDto): Promise<RolesEntity> {
    return await this.roleService.create(roleCreateDto);
  }
}
