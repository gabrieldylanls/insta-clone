import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';

import { User } from '../user/interfaces/user.interfaces';
import { Token } from './interfaces/token.interface';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() user: User): Promise<Token> {
    return await this.authService.login(user);
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }
}
