import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  DeleteDateColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
@Index(['status', 'type', 'transactionDate'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

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

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  updatedAt?: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;

  @Index()
  @ManyToOne(() => Account, (account: Account) => account)
  account?: Promise<Account>;
}
