import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment } from './interfaces/comment.interfaces';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  public async getCommentsFromPost(postId: string): Promise<Comment[]> {
    return await this.commentModel.find({ post: postId }).limit(12);
  }

  public async findById(id: string): Promise<Comment> {
    return await this.commentModel.findById(id);
  }

  public async comment(createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentModel.create(createCommentDto);
  }

  public async updateComment(id: string, updateCommentDto: UpdateCommentDto): Promise<boolean> {
    const { text } = updateCommentDto;
    return await this.commentModel
      .findByIdAndUpdate(id, { text })
      .then(res => !!res);
  }

  public async deleteComment(id: string): Promise<boolean> {
    return await this.commentModel
      .findByIdAndDelete(id)
      .then(res => !!res);
  }
}
