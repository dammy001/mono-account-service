import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExceptionException extends HttpException {
  constructor(
    public message: string,
    public code: number = HttpStatus.BAD_REQUEST,
  ) {
    super(message, code);
  }
}
