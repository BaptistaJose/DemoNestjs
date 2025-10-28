import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserBodyDto } from './dtos/userBody.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async singUp(user: UserBodyDto) {
    const userExist = await this.userService.getByEmail(user.email);
    if (userExist)
      throw new BadRequestException('Este mail ya se encuentra registrado');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword)
      throw new BadRequestException('La contrasena no se pudo hashear');

    const userCreate = await this.userService.createUser({
      ...user,
      password: hashedPassword,
    });

    return userCreate;
  }

  async signIn(credential) {
    const user = await this.userService.getByEmail(credential.email);
    if (!user) throw new BadRequestException('Credenciales incorrecta');

    const passwordCompare = await bcrypt.compare(
      credential.password,
      user.password,
    );
    if (!passwordCompare)
      throw new BadRequestException('Credenciales incorrecta');

    const userPayload = {
        sub: user.id,
        id: user.id,
        email: user.email
    }

    const token = this.jwtService.sign(userPayload)

    return {message:'Usuario logueado con exito!!', token: token};
  }
}
