import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './entities/todos.entity';
import { Readable } from 'stream';

describe('todosController', () => {
  let todosController: TodosController;
  let mockTodosService: Partial<TodosService>;

  const mockTodo: Partial<Todo> = {
    title: 'title1',
    description: 'description todo',
  };

  const mockFile: Express.Multer.File = {
    fieldname: 'example',
    originalname: 'example.txt',
    encoding: 'utf-8',
    mimetype: 'text/plain',
    size: 0,
    stream: new Readable(),
    destination: '',
    filename: '',
    path: '',
    buffer: Buffer.from([]),
  };

  beforeEach(async () => {
    mockTodosService = {
      getTodos: () =>
        Promise.resolve([{ ...mockTodo, id: '1', isCompleted: false } as Todo]),
      getTodoById: (id: string) =>
        Promise.resolve({ ...mockTodo, id: '1', isCompleted: false } as Todo),
      createTodo: (todo: Partial<Todo>) =>
        Promise.resolve({ ...mockTodo, id: '1', isCompleted: false } as Todo),
      saveFile: () =>
        Promise.resolve({
          id: '1',
          name: 'example.txt',
          mimeType: 'text/plain',
          data: Buffer.from([]),
          todo: { ...mockTodo, id: '1', isCompleted: false } as Todo,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [{ provide: TodosService, useValue: mockTodosService }],
    }).compile();
    todosController = module.get<TodosController>(TodosController);
  });

  it('Tiene que estar definido', () => {
    expect(todosController).toBeDefined();
  });

  it('getTodos() debe retonar un arreglo de todos', async () => {
    const todo = await todosController.getTodos();
    expect(todo).toEqual([
      {
        id: '1',
        title: 'title1',
        description: 'description todo',
        isCompleted: false,
      },
    ]);
  });

  it('createTodo() debe crear un todo', async () => {
    const todo = await todosController.createTodo(mockTodo);
    expect(todo).toEqual({
      id: '1',
      title: 'title1',
      description: 'description todo',
      isCompleted: false,
    });
  });

  it('saveFile() debe cargar una imagen', async () => {
    const file = await todosController.uploadFile('1',mockFile)
    expect(file).toEqual({
          id: '1',
          name: 'example.txt',
          mimeType: 'text/plain',
          data: Buffer.from([]),
          todo: { ...mockTodo, id: '1', isCompleted: false } as Todo,
        })
  });
});
