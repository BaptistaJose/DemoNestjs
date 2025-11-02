import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UserBodyDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password:string

    
    @IsOptional()
    isAdmin?: boolean
}