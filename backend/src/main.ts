import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // habilitar CORS para permitir la conexion con angular

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
