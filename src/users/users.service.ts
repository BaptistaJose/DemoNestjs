import { HttpException, Inject, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./entities/user.entity";
import { UserBodyDto } from "./dtos/userBody.dto";


@Injectable()
export class UsersService{
    constructor(private readonly usersRepository: UsersRepository){}
    
    async  getUSers(){
        return await this.usersRepository.getUsers()
    }
    
    async  createUser(user: UserBodyDto){
        if(!user){
            throw new HttpException('Faltan propiedades para crear el usuario', 400);
        }
        
        return await this.usersRepository.createUser(user)
    }
    async  updateUser(id: string, user: User) {
        return await this.usersRepository.updateUser(id, user)
    }
    
    async getByEmail(email: string) {
       const user = await this.usersRepository.getByEmail(email)
       return user
    }
}