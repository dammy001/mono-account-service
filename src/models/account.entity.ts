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
  OneToMany,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Entity()
@Index(['accountNo', 'bankName', 'balance'])
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

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

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt?: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  updatedAt?: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;

  @Index()
  @ManyToOne(() => User, (user: User) => user)
  user?: Promise<User>;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions?: Promise<Transaction[]>;
}
