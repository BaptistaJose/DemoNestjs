import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const options = config.get('typeorm');
        if (!options) {
          throw new Error('TypeORM configuration not found');
        }
        return options;
      },
    }),
    UsersModule,
    TodosModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [
    /*{
    provide: APP_GUARD,
    useClass: AuthGuard
  }*/
  ],
})
export class AppModule {}
