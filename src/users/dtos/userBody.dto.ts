import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UserBodyDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'John Doe'})
    name:string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example:"john@gmail.com"})
    email:string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({example:"P@ssw0rd!"})
    password:string

    
    @IsOptional()
    @ApiProperty({example:false})
    isAdmin?: boolean
}