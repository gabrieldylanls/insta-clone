import { Controller, Post, Body, Get, Param, Put, HttpCode, HttpStatus, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Post as PostInterface } from './interfaces/post.interfaces';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../user/interfaces/user.interfaces';
import { userCan } from '../user/helpers/user.helper';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get()
  public async findAll(): Promise<PostInterface[]> {
    return await this.postService.findAll();
  }

  @Get(':id')
  public async findById(@Param() params: { id: string }): Promise<PostInterface> {
    return await this.postService.findById(params.id);
  }

  @Get('user/:userId')
  public async findByUser(@Param() params: { userId: string }): Promise<PostInterface[]> {
    return await this.postService.findByUser(params.userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async create(@Body() createPostDto: CreatePostDto): Promise<PostInterface> {
    return await this.postService.createPost(createPostDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(@Req() req: Request, @Param() params: { id: string }, @Body() updatePostDto: UpdatePostDto): Promise<boolean> {
    const user = req.user as User;
    const post = await this.postService.findById(params.id);
    if (userCan(user)(post)) {
      return await this.postService.updatePost(params.id, updatePostDto);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Req() req: Request, @Param() params: { id: string }): Promise<boolean> {
    const user = req.user as User;
    const post = await this.postService.findById(params.id);
    if (userCan(user)(post)) {
      return await this.postService.deletePost(params.id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
