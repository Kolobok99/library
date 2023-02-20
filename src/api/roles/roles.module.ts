import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from '@app/api/roles/roles.service';
import { RolesController } from '@app/api/roles/roles.controller';
import { RolesEntity } from '@app/api/roles/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
