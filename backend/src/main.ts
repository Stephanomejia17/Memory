import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', 
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  }); 

  app.use(
    session({
      secret: 'clave',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, 
        secure: false,
        sameSite: 'lax', 
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();