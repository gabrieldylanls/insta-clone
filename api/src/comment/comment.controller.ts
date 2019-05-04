import { Controller, Param, Get, Post, Body, Req, UseGuards, Put, HttpCode, HttpStatus, UnauthorizedException, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './interfaces/comment.interfaces';
import { User } from '../user/interfaces/user.interfaces';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Get(':postId')
  public async getCommentsFromPost(@Param() params: { postId: string }): Promise<Comment[]> {
    return await this.commentService.getCommentsFromPost(params.postId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async comment(@Req() req: Request, @Body() createCommentDto: CreateCommentDto) {
    const author = req.user as User;
    createCommentDto.author = author.id;
    return await this.commentService.comment(createCommentDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async updateComment(@Req() req: Request, @Param() params: { id: string }, @Body() updateCommentDto: UpdateCommentDto): Promise<boolean> {
    const user = req.user as User;
    const comment = await this.commentService.findById(params.id);
// tslint:disable-next-line: triple-equals
    if (comment.author == user.id) {
      return await this.commentService.updateComment(params.id, updateCommentDto);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteComment(@Req() req, @Param() params: { id: string }) {
    const user = req.user as User;
    const comment = await this.commentService.findById(params.id);
// tslint:disable-next-line: triple-equals
    if (comment.author == user.id) {
      return await this.commentService.deleteComment(params.id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
