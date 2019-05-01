import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from './interfaces/post.interfaces';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from '../user/user.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    private readonly userService: UserService,
  ) { }

  public async findAll(): Promise<Post[]> {
    return await this.postModel
      .find()
      .limit(12);
  }

  public async findByUser(userId: string): Promise<Post[]> {
    return await this.postModel
      .find({ author: userId })
      .limit(12);
  }

  public async findById(id: string): Promise<Post> {
    return await this.postModel.findById(id);
  }

  public async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const author = await this.userService.findById(createPostDto.author);
    return await this.postModel.create({ ...createPostDto, author });
  }

  public async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<boolean> {
    return await this.postModel
      .findByIdAndUpdate(id, updatePostDto)
      .then(res => !!res);
  }

  public async deletePost(id: string): Promise<boolean> {
    return await this.postModel
      .findByIdAndDelete(id)
      .then(res => !!res);
  }
}
