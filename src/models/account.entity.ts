import { Entity, Column, ManyToOne, Index, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Entity()
@Index(['accountNo', 'bankName', 'balance'])
export class Account extends Base {
  @Column({ unique: true })
  accountNo: string;

  @Column({ nullable: true })
  accountName?: string | null;

  @Column()
  bankName?: string;

  @Column()
  balance?: number;

  @Column({ nullable: true })
  logo?: string | null;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ type: 'datetime', nullable: true })
  linkedAt?: Date | string | null;

  @Column({ type: 'datetime', nullable: true })
  unlinkedAt?: Date | string | null;

  @Index()
  @ManyToOne(() => User, (user: User) => user)
  user?: Promise<User>;

  @OneToMany(() => Transaction, (transaction) => transaction.account, {
    onDelete: 'CASCADE',
  })
  transactions?: Promise<Transaction[]>;
}
