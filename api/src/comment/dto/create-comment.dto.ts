export class CreateCommentDto {
  private readonly text: string;
  private readonly post: string;
  public author?: string;
}