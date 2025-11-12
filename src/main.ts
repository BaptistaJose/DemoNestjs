import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import {config as auth0Config} from './config/Auth0'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config))
  app.useGlobalPipes(new ValidationPipe())
  app.use(LoggerMiddleware)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My API demo nestjs')
    .setDescription('Esta es una API de ejemplo creada con NestJS para ser empleada en las demos del m4 de la especialización de backend de Henry.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api',app, document)
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
