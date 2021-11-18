import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExceptionException extends HttpException {
  constructor(
    public message: string,
    public code: number = HttpStatus.I_AM_A_TEAPOT,
  ) {
    super(message, code);
  }
}
