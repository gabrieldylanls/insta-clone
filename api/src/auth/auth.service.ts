import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { User } from '../user/interfaces/user.interfaces';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Token } from './interfaces/token.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  public async login(userData: User): Promise<Token> {
    const user: User = await this.validateUser(userData);
    if (!user) {
      this.getError('User not found', HttpStatus.NOT_FOUND);
    }

    const validatePassword = await compare(userData.password, user.password);
    if (!validatePassword) {
      this.getError('User or password invalid', HttpStatus.UNAUTHORIZED);
    }

    const payload: JwtPayload = { id: user.id, email: user.email, name: user.name };
    const token = this.jwtService.sign(payload, { expiresIn: 3600 });

    return {
      token,
      status: HttpStatus.OK,
    };
  }

  public async register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  public async validateUser(userData: User) {
    return await this.userService.findByEmail(userData.email);
  }

  private getError(msg: string, status: HttpStatus) {
    throw new HttpException(msg, status);
  }
}
