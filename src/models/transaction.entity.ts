import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { Account } from './account.entity';
import { Base } from './base.entity';

@Entity()
@Index(['status', 'type', 'transactionDate'])
export class Transaction extends Base {
  @Column({ nullable: true })
  description?: string | null;

  @Column({ nullable: true })
  icon?: string;

  @Column()
  amount?: number;

  @Column()
  type?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ type: 'timestamp', nullable: true })
  transactionDate?: Date | null;

  @Index()
  @ManyToOne(() => Account, (account: Account) => account, {
    onDelete: 'CASCADE',
  })
  account?: Promise<Account>;
}
