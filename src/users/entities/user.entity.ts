import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name:string;

    @Column()
    email:string;

    @Column({nullable: false})
    password:string

    @Column({default: false})
    createdAt: boolean;
}