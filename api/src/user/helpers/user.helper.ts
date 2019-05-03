import { User } from '../interfaces/user.interfaces';
import { Post } from '../../post/interfaces/post.interfaces';

export const userCan = (user: User): NewableFunction =>
// tslint:disable-next-line: triple-equals
  (post: Post): boolean => user.id == post.author;
