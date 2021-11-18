import { Delete, Param } from '@nestjs/common';
import { Controller, Get, Post, Patch } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount() {
    return 'create account';
  }

  @Get()
  getAccounts() {
    return 'all accounts';
  }

  @Get('transactions/:account')
  getTransactions(@Param('account') account: string | number) {
    return `account transactions ${account}`;
  }

  @Patch(':account')
  unlinkAccount(@Param('account') account: string | number) {
    return this.accountService.unlinkAccount(account);
  }

  @Delete(':account')
  deleteAccount(@Param('account') account: string | number) {
    return `delete account ${account}`;
  }
}
