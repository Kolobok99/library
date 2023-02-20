import { Module } from '@nestjs/common';

import { AuthController } from '@app/api/auth/auth.controller';
import { AuthService } from '@app/api/auth/auth.service';

import { UsersModule } from '@app/api/users/users.module';
import { RolesModule } from '@app/api/roles/roles.module';
import { AuthHelper } from "@app/api/auth/auth.helper";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthHelper],
  imports: [UsersModule, RolesModule],
  exports: [AuthHelper],
})
export class AuthModule {}
