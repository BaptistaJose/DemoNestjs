import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('authService', () => {
  let authService: AuthService;
  let userDbMock: Partial<UsersService>;
  const userMock = {
    name: 'pepito',
    createdAt: true,
    password: '123456',
    email: 'pepito@gmail.com',
  };
  beforeEach(async () => {
     userDbMock = {
      getByEmail() {
        return Promise.resolve(undefined);
      },

      createUser(user) {
        return Promise.resolve({
          ...user,
          isAdmin: false,
          id: '1234fz-234sd-24csfd',
        });
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: UsersService, useValue: userDbMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('crear una instancia de authService', async () => {
    expect(authService).toBeDefined();
  });

  it('El SignUp() debe crear un usuario y encriptar la password', async () => {
    const user = await authService.singUp(userMock as User);
    expect(user).toBeDefined()
    expect(user.password).not.toEqual(userMock.password)
    expect(user.isAdmin).toBeFalsy()
  });

  it('EL SignUp() debe lanzar un error cuando el email se encuentre en uso', async ()=>{
    userDbMock.getByEmail = () => Promise.resolve(userMock as User)
    try {
      await authService.singUp(userMock as User)
    } catch (error) {
      expect(error.message).toEqual('Este mail ya se encuentra registrado')
    }
  })
});
