import {
  Delete,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { Account } from 'src/models/account.entity';
import { Transaction } from 'src/models/transaction.entity';
import { User as UserEntity } from 'src/models/user.entity';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Response } from 'express';

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

  @Put(':account/unlink')
  async unlinkAccount(
    @Param('account') account: string | number,
    @Res() res: Response,
  ): Promise<void> {
    const unlink = await this.accountService.unlinkAccount(account);
    if (unlink.affected) {
      res.status(HttpStatus.ACCEPTED).send({
        status: true,
        message: 'Account Unlinked Successfully',
      });
    }
  }

  @Delete(':account')
  async deleteAccount(
    @Param('account') account: string | number,
    @Res() res: Response,
  ): Promise<void> {
    const deleted = await this.accountService.deleteAccount(account);
    if (deleted.affected) {
      res.status(HttpStatus.ACCEPTED).send({
        status: true,
        message: 'Account Deleted',
      });
    }
  }
}
