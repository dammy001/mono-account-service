import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction.entity';
import { TransactionService } from './transactions.service';

@Global()
@Module({
  providers: [TransactionService],
  imports: [TypeOrmModule.forFeature([Transaction])],
  exports: [TransactionService],
})
export class TransactionsModule {}
