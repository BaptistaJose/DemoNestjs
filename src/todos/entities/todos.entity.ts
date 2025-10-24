import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './file.entity';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({type:'boolean', default: false})
  isCompleted: boolean;

  @OneToMany(()=> File, (file)=>file.todo)
  file: File[]
}
