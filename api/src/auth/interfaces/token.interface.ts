import { HttpStatus } from '@nestjs/common';

export interface Token {
  readonly token: string;
  readonly status: HttpStatus;
}
