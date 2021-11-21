import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: number;

  @Column()
  accountName: string;

  @Column()
  balance: number;

  @Column()
  logo: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  linkedAt: Date | string | undefined | null;

  @Column()
  unlinkedAt: Date | string | undefined | null;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
