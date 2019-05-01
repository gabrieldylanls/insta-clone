import { User } from '../../user/interfaces/user.interfaces';

export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly photo?: string;
  readonly author: User;
  readonly createdAt?: Date;
}
