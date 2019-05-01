import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { PostSchema } from './schemas/post.schema';
import { UserModule } from '../user/user.module';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { PostController } from './post.controller';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: 'Post', schema: PostSchema } ]),
    PassportModule,
    UserModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    UserService,
  ],
})
export class PostModule {}
