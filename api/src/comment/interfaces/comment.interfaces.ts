import { Document } from 'mongoose';

export interface Comment extends Document {
  readonly id: string;
  readonly text: string;
  readonly post: string;
  readonly author: string;
  readonly createdAt: Date;
}
