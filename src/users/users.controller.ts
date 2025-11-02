import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { UserBodyDto } from './dtos/userBody.dto';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from './enum/roles.enum';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.Admin)
  async getUsers(@Req() request: Request & {user: any}) {
    console.log(request.user);
    
    return await this.usersService.getUSers();
  }

  @Get('auth0/protected')
  async getAuth0Protected(@Req() req: Request){
    console.log(req.oidc.accessToken);
    
    return JSON.stringify(req.oidc.user)
  }

  @Post('signUp')
  @UseInterceptors(DateAdderInterceptor)
  async createUSer(@Body() user: UserBodyDto) {
    return await this.authService.singUp(user)
  }

  @Post('signIn')
  @UseInterceptors(DateAdderInterceptor)
  async signIn(@Body() credentials) {
    return await this.authService.signIn(credentials)
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: any) {
    return await this.usersService.updateUser(id, user);
  }

  @Delete()
  async deleteUser() {
    throw new Error('jajaxd');
  }
}
