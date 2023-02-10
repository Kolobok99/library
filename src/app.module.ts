import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database.config';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), UsersModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
