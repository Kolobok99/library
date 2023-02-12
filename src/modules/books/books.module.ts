import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService } from '@app/modules/books/books.service';
import { BooksController } from '@app/modules/books/books.controller';
import { BooksEntity } from '@app/modules/books/books.entity';

import { UsersModule } from '@app/modules/users/users.module';
import { SubscriptionsModule } from '@app/modules/subscriptions/subscriptions.module';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    TypeOrmModule.forFeature([BooksEntity]),
    UsersModule,
    SubscriptionsModule,
  ],
  exports: [BooksService],
})
export class BooksModule {}
