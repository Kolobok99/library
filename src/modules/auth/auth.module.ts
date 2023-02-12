import { Module } from '@nestjs/common';

import { AuthController } from '@app/modules/auth/auth.controller';
import { AuthService } from '@app/modules/auth/auth.service';

import { UsersModule } from '@app/modules/users/users.module';
import { RolesModule } from '@app/modules/roles/roles.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, RolesModule],
  exports: [],
})
export class AuthModule {}
