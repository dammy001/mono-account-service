import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  accountNumber: number;

  @Column()
  accountName: string;

  @Column()
  balance: number;

  @Column()
  logo: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('datetime')
  linkedAt: string;

  @Column('datetime')
  unlinkedAt: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
