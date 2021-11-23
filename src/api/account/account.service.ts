import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Connection, Repository, UpdateResult } from 'typeorm';
import { Account } from 'src/models/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { generateRandomTransaction } from 'src/constants';
import { Transaction } from 'src/models/transaction.entity';
import { TransactionService } from '../transactions/transactions.service';

@Injectable()
export class AccountService {
  private randomTransactions = generateRandomTransaction(20);
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private transactionService: TransactionService,
    private connection: Connection,
  ) {}

  async linkAccount(user: any, account: Account): Promise<Account> {
    await this.isAccountNoExist(account.accountNo);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createAccount = this.accountRepository.create({
        ...account,
        user,
        accountName: 'damilare anjorin',
        linkedAt: new Date(),
        balance: 500000,
      });

      await queryRunner.manager.save(createAccount);

      this.randomTransactions.forEach((transaction: Transaction) => {
        this.transactionService.create(createAccount, transaction);
      });

      await queryRunner.commitTransaction();

      return createAccount;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async getLinkedAccounts(user: any): Promise<Account[]> {
    return await this.accountRepository.find({
      where: { user: user, isActive: true },
    });
  }

  async isAccountNoExist(accountNo: number | string): Promise<Account> {
    const account = await this.connection
      .createQueryBuilder()
      .select('account.accountNo')
      .from(Account, 'account')
      .where('account.accountNo = :accountNo', { accountNo })
      .getOne();

    if (account) {
      throw new HttpException('Account Already Exists', HttpStatus.BAD_REQUEST);
    }
    return account;
  }

  async getAccount(id: string | number): Promise<Account | undefined> {
    const account = await this.accountRepository.findOne(id);
    if (!account) {
      throw new NotFoundException('Account not Found');
    }
    return account;
  }

  async unlinkAccount(id: string | number): Promise<UpdateResult> {
    const account = await this.getAccount(id);
    return await this.connection
      .createQueryBuilder()
      .update(Account)
      .set({ unlinkedAt: new Date(), isActive: false })
      .where('id = :id', { id: account.id })
      .execute();
  }

  async deleteAccount(id: string | number): Promise<UpdateResult> {
    return await this.accountRepository.softDelete(id);
  }
}
