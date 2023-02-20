import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';

import { UsersService } from '@app/api/users/users.service';
import { UsersController } from '@app/api/users/users.controller';
import { UsersEntity } from '@app/api/users//users.entity';

import { SubscriptionsEntity } from '@app/api/subscriptions/subscriptions.entity';
import { RolesModule } from '@app/api/roles/roles.module';
import { UsersHelper } from "@app/api/users/users.helper";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, SubscriptionsEntity]),
    RolesModule,
  ],
  providers: [UsersService, UsersHelper],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
