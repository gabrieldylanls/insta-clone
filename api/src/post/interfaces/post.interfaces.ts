import { Document } from 'mongoose';
import { User } from '../../user/interfaces/user.interfaces';

export interface Post extends Document {
  readonly id?: string;
  readonly title?: string;
  readonly content?: string;
  readonly photo?: string;
  readonly author?: User;
  readonly createdAt?: Date;
}
