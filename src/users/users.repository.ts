import { Injectable } from "@nestjs/common";
import { IUSer } from "./user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository{
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}
   /* private users = [
        {id: 1, name: 'John Doe', email: 'John@gmail.com'},
        {id: 2, name: 'Jane Smith', email: 'jane@gmail.com'},
        {id: 3, name: 'Alice Johnson', email: 'alice@gmail.com'},
    ];*/

    async getUsers(){
        return await this.userRepository.find()
    }

    createUser(user: Omit<IUSer, 'id'>){
         
        return this.userRepository.save(user);
    }
}