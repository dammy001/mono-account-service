import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async create(
    account: any,
    transaction: Transaction,
  ): Promise<Transaction | undefined> {
    try {
      const createTransaction = this.transactionRepository.create({
        ...transaction,
        account,
      });
      await this.transactionRepository.save(createTransaction);

      return createTransaction;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
