import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { RoleCreateDto } from '@app/modules/roles/dto/role-create.dto';
import { RolesService } from '@app/modules/roles/roles.service';
import { RolesEntity } from '@app/modules/roles/roles.entity';

import { AuthGuard } from '@app/guards/auth.guard';
import { AuthAdminGuard } from '@app/guards/auth.admin.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  // @UseGuards(AuthAdminGuard)
  // @UseGuards(AuthGuard)
  async create(
    @Body('role') roleCreateDto: RoleCreateDto,
  ): Promise<RolesEntity> {
    return await this.roleService.create(roleCreateDto);
  }
}
