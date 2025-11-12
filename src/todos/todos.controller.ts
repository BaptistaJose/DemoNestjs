import { Body, Controller, Get, Post, UploadedFile, UseInterceptors, NotFoundException } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('todos')
@Controller('todos')
export class TodosController{
    constructor(private readonly todosService: TodosService){}

    @Get()
    async getTodos(){
        return await this.todosService.getTodos();
    }

    @Post()
    async createTodo(@Body() todo: any){
        return await this.todosService.createTodo(todo)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Body('id') id:string, @UploadedFile() file: Express.Multer.File){
        const todo = await this.todosService.getTodoById(id)
        if (!todo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return await this.todosService.saveFile({name: file.originalname, mimeType: file.mimetype, data: file.buffer, todo: todo})
    }

}