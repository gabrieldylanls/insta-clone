import { Document } from 'mongoose';

export interface Post extends Document {
  readonly id?: string;
  readonly title?: string;
  readonly content?: string;
  readonly photo?: string;
  readonly author?: string;
  readonly createdAt?: Date;
}
