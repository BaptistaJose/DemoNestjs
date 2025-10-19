import { HttpException, Inject, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { IUSer } from "./user.interface";


@Injectable()
export class UsersService{
    constructor(private readonly usersRepository: UsersRepository, @Inject('ACCESS_TOKEN') private accesToken: string){}
    
    getUSers(){
        return this.accesToken === 'Esta es mi clave secreta' ? this.usersRepository.getUsers(): 'No tiene acceso a los usuarios';
    }

    createUser(user: Omit<IUSer, 'id'>){
        if(!user){
            throw new HttpException('Faltan propiedades para crear el usuario', 400);
        }

        return this.usersRepository.createUser(user)
    }
}