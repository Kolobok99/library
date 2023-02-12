import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';

import { SubscriptionsService } from '@app/modules/subscriptions/subscriptions.service';
import { SubscriptionsController } from '@app/modules/subscriptions/subscriptions.controller';
import { SubscriptionsEntity } from '@app/modules/subscriptions/subscriptions.entity';

import { UsersModule } from '@app/modules/users/users.module';
import { BooksEntity } from '@app/modules/books/books.entity';

@Module({
  controllers: [SubscriptionsController],
  imports: [
    TypeOrmModule.forFeature([SubscriptionsEntity, BooksEntity]),
    UsersModule,
  ],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
