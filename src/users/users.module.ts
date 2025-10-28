import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { AuthService } from "./auth.service";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersRepository,
        {
        provide: "ACCESS_TOKEN",
        useValue: "Esta es mi clave secreta"
    },
    AuthService
],
    controllers:[UsersController],
})
export class UsersModule{}