import { Module } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";
import { TodosRepository } from "./todos.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./entities/todos.entity";
import { File } from "./entities/file.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Todo, File])],
    providers:[TodosService, TodosRepository],
    controllers:[TodosController]
})
export class TodosModule{}