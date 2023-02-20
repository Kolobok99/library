import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UsersModule } from "@app/api/users/users.module";
import { SubscriptionsModule } from "@app/api/subscriptions/subscriptions.module";
import { AuthModule } from "@app/api/auth/auth.module";
import { RolesModule } from "@app/api/roles/roles.module";
import { BooksModule } from "@app/api/books/books.module";
import { AuthMiddleware } from "@app/api/auth/middleware/auth.middleware";

@Module({
  imports: [
    UsersModule,
    SubscriptionsModule,
    AuthModule,
    RolesModule,
    BooksModule,
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}