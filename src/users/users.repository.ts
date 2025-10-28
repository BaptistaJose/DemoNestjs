import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserBodyDto } from './dtos/userBody.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async createUser(user: UserBodyDto) {
    return await this.userRepository.save(user);
  }

  async updateUser(id: string, user: UserBodyDto) {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.userRepository.update(id, user);

    return 'User Update';
  }
  async getByEmail(email: string) {
    const userExist = await this.userRepository.findOneBy({email})
    return userExist
  }
}
