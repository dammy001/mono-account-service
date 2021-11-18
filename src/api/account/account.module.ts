import { Module, Global } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Global()
@Module({
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
