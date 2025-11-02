import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import {config as auth0Config} from './config/Auth0'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config))
  app.useGlobalPipes(new ValidationPipe())
  app.use(LoggerMiddleware)
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
