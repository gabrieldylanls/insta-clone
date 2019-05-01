export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly photo?: string;
  readonly author: string;
  readonly createdAt?: Date;
}
