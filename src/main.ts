import { ValidationPipe } from "@nestjs/common";

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import { AppModule } from '@app/app.module';
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {

  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('APP_PORT');

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Library REST API')
    .setDescription('Документация library api')
    .setVersion('1.0.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, document);
  await app.listen(port);
}
bootstrap()
