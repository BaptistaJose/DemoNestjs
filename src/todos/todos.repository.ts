import { Injectable } from "@nestjs/common";

@Injectable()
export class TodosRepository{
    private todos = [
        {id: 1, title: 'First Todo', completed: false},
        {id: 2, title: 'Second Todo', completed: true},
        {id: 3, title: 'Third Todo', completed: false},
    ]

    async getTodos(){
        return this.todos
    }
}