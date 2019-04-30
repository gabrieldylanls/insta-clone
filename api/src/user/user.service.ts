import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';

import { User } from './interfaces/user.interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userSchema: Model<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userSchema.find();
  }

  public async findById(id: string): Promise<User> {
    return await this.userSchema.findById(id);
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userSchema.findOne({ email });
  }

  public async checkUsername(name: string): Promise<boolean> {
    return await this.userSchema
      .findOne({ name })
      .then(res => !!res);
  }

  public async checkEmail(email: string): Promise<boolean> {
    return await this.findByEmail(email).then(res => !!res);
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const password: string = await hash(createUserDto.password, 10);
    return await this.userSchema.create({ ...createUserDto, password });
  }

  public async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userSchema.findByIdAndUpdate(id, updateUserDto);
  }

  public async updatePassword(id: string, userPassword: string): Promise<boolean> {
    const password = await hash(userPassword, 10);
    return await this.userSchema
      .findByIdAndUpdate(id, { password })
      .then(res => !!res);
  }

  public async deleteUser(id: string): Promise<boolean> {
    return await this.userSchema
      .findByIdAndDelete(id)
      .then(res => !!res);
  }
}
