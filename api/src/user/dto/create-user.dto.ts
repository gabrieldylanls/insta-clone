export class CreateUserDto {
  private readonly name: string;
  private readonly fullName: string;
  private readonly email: string;
  public password: string;
  private readonly photo?: string;
  private readonly createdAt?: Date;
}
