import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';

import { SubscriptionsService } from '@app/api/subscriptions/subscriptions.service';
import { SubscriptionsController } from '@app/api/subscriptions/subscriptions.controller';
import { SubscriptionsEntity } from '@app/api/subscriptions/subscriptions.entity';

import { UsersModule } from '@app/api/users/users.module';
import { BooksEntity } from '@app/api/books/books.entity';
import { SubsHelper } from "@app/api/subscriptions/subs.helper";

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionsEntity, BooksEntity]),
    UsersModule,
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubsHelper],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
