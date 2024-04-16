import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(module);
  await app.listen(3000);
}
bootstrap();
