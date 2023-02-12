import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppDataSource } from '@app/database.config';

import { UsersModule } from '@app/modules/users/users.module';
import { SubscriptionsModule } from '@app/modules/subscriptions/subscriptions.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { AuthMiddleware } from '@app/modules/auth/middleware/auth.middleware';
import { RolesModule } from '@app/modules/roles/roles.module';
import { BooksModule } from '@app/modules/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    SubscriptionsModule,
    AuthModule,
    RolesModule,
    BooksModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
