import { Controller, Get, Param, HttpCode, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './interfaces/user.interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  public async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  public async findById(@Param() params: { id: string }): Promise<User> {
    return await this.userService.findById(params.id);
  }

  @Get('findByEmail/:email')
  public async findByEmail(@Param() params: { email: string }): Promise<User> {
    return await this.userService.findByEmail(params.email);
  }

  @Get('checkEmail/:email')
  public async checkEmail(@Param() params: { email: string }): Promise<boolean> {
    return await this.userService.checkEmail(params.email);
  }

  @Get('checkUsername/:name')
  public async checkUsername(@Param() params: { name: string }): Promise<boolean> {
    return await this.userService.checkUsername(params.name);
  }

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(@Param() params: { id: string }, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.updateUser(params.id, updateUserDto);
  }

  @Put('updatePassword/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async updatePassword(@Param() params: { id: string }, @Body() body: { password: string }): Promise<boolean> {
    return await this.userService.updatePassword(params.id, body.password);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() params: { id: string }): Promise<boolean> {
    return await this.userService.deleteUser(params.id);
  }
}
