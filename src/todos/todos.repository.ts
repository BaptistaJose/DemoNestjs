import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todos.entity';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class TodosRepository {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  async getTodos() {
    return await this.todoRepository.find({ relations: { file: true } });
  }

  async getTodoById(id:string){
    return await this.todoRepository.findOneBy({id})
  }

  async createTodo(todo: Partial<Todo>) {
    return await this.todoRepository.save(todo);
  }

  async saveFile({
    name,
    mimeType,
    data,
    todo,
  }: {
    name: string;
    mimeType: string;
    data: Buffer;
    todo: Todo;
  }) {
    const newFile = new File();
    newFile.name = name;
    newFile.mimeType = mimeType;
    newFile.data = data;
    newFile.todo = todo;

    return await this.fileRepository.save(newFile);
  }
}
