import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvPath } from "@app/common/helper/env.helper";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmConfigService } from "@app/database/database.service";
import { ApiModule } from "@app/api/api.module";

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
    ApiModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
