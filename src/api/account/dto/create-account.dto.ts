import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(11)
  accountNo: string;

  @IsNotEmpty()
  bankName: string;
}
