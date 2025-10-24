import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/guards/auth.guard";
import { DateAdderInterceptor } from "src/interceptors/date-adder.interceptor";
import { UserBodyDto } from "./dtos/userBody.dto";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @Get()
    @UseGuards(AuthGuard)
   async getUsers(){
        return  await this.usersService.getUSers();
    }

    @HttpCode(201)
    @Post()
    @UseInterceptors(DateAdderInterceptor)
     async createUSer(@Body() user: UserBodyDto, @Req() request ){
        console.log("Nueva propiedad implementada en el objeto req:", request.now);
        
        return await this.usersService.createUser(user)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
   async updateUser(@Param('id', ParseUUIDPipe) id:string, @Body() user: any){
        return await this.usersService.updateUser(id,user)
    }

    @Delete()
   async deleteUser(){
        throw new Error('jajaxd')
    }
}