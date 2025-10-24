import { Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { Todo } from './entities/todos.entity';
import { File } from './entities/file.entity';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async getTodos() {
    return await this.todosRepository.getTodos();
  }

  async getTodoById(id: string) {
    return await this.todosRepository.getTodoById(id);
  }

  async createTodo(todo: Partial<Todo>) {
    return await this.todosRepository.createTodo(todo);
  }

  async saveFile({ name, mimeType, data, todo }:Omit<File, 'id'>) {
    return await this.todosRepository.saveFile({ name, mimeType, data, todo });
  }
}
