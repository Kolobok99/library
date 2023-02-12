import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';

import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Library REST API')
    .setDescription('Документация library api')
    .setVersion('1.0.1')
    .addTag('library')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, swaggerDocument);
  await app.listen(process.env.PORT || 3000);
}
bootstrap()
  .then(() => console.log('SERVER START AT ', process.env.PORT || 3000))
  .catch((error) => console.log('SERVER FAILED:', error));
