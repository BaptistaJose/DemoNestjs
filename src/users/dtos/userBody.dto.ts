import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserBodyDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string
}