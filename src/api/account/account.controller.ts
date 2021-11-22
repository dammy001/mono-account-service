import {
  Delete,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
} from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { Account } from 'src/models/account.entity';
import { Transaction } from 'src/models/transaction.entity';
import { User as UserEntity } from 'src/models/user.entity';
import { UpdateResult } from 'typeorm';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async linkAccount(
    @User('id') id: UserEntity,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    return await this.accountService.linkAccount(id, createAccountDto);
  }

  @Get(':account')
  async getAccount(@Param('account') account: string): Promise<Account> {
    return await this.accountService.getAccount(account);
  }

  @Get()
  getLinkedAccounts(@User('id') user: UserEntity): Promise<Account[]> {
    return this.accountService.getLinkedAccounts(user);
  }

  @Get(':account/transactions')
  async getTransactions(
    @Param('account') account: string | number,
  ): Promise<Transaction[]> {
    const accountModel = await this.accountService.getAccount(account);
    return await accountModel.transactions;
  }

  @Put('unlink/:account')
  async unlinkAccount(
    @Param('account') account: string | number,
  ): Promise<UpdateResult> {
    return await this.accountService.unlinkAccount(account);
  }

  @Delete(':account')
  async deleteAccount(
    @Param('account') account: string | number,
  ): Promise<void> {
    return await this.accountService.deleteAccount(account);
  }
}
