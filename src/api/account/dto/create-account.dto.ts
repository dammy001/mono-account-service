import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  accountNo: string;

  @IsNotEmpty()
  bankName: string;
}
