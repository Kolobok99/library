import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService } from '@app/api/books/books.service';
import { BooksController } from '@app/api/books/books.controller';
import { BooksEntity } from '@app/api/books/books.entity';

import { UsersModule } from '@app/api/users/users.module';
import { SubscriptionsModule } from '@app/api/subscriptions/subscriptions.module';
import { BooksHelper } from "@app/api/books/books.helper";

@Module({
  providers: [BooksService, BooksHelper],
  controllers: [BooksController],
  imports: [
    TypeOrmModule.forFeature([BooksEntity]),
    UsersModule,
    SubscriptionsModule,
  ],
  exports: [BooksService],
})
export class BooksModule {}
