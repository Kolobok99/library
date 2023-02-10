import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
