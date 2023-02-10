import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap()
  .then(() => console.log('SERVER START AT ', process.env.PORT || 3000))
  .catch((error) => console.log('SERVER FAILED:', error));
