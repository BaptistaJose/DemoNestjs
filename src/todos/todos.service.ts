import { Injectable } from "@nestjs/common";
import { TodosRepository } from "./todos.repository";

@Injectable()
export class TodosService{
    constructor(private readonly todosRepository: TodosRepository){}

    getTodos(){
        return this.todosRepository.getTodos()
    }
}