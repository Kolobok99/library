import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';

import { UsersService } from '@app/modules/users/users.service';
import { UsersController } from '@app/modules/users/users.controller';
import { UsersEntity } from '@app/modules/users//users.entity';

import { SubscriptionsEntity } from '@app/modules/subscriptions/subscriptions.entity';
import { RolesModule } from '@app/modules/roles/roles.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UsersEntity, SubscriptionsEntity]),
    RolesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
