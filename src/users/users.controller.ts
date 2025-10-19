import { Body, Controller, Delete, Get, HttpCode, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { IUSer } from "./user.interface";
import { AuthGuard } from "src/guards/auth.guard";
import { DateAdderInterceptor } from "src/interceptors/date-adder.interceptor";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @Get()
    @UseGuards(AuthGuard)
    getUsers(){
        return this.usersService.getUSers();
    }

    @HttpCode(201)
    @Post()
    @UseInterceptors(DateAdderInterceptor)
    createUSer(@Body() user: IUSer, @Req() request ){
        console.log("Nueva propiedad implementada en el objeto req:", request.now);
        
        return this.usersService.createUser(user)
    }

    @Put()
    updateUser(){
        return 'Este endpoint actualiza un usuario'
    }

    @Delete()
    deleteUser(){
        return 'Este endpoint elimina un usuario'
    }
}