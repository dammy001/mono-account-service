import { Entity, Column, OneToMany } from 'typeorm';
import { Account } from './account.entity';
import { Exclude } from 'class-transformer';
import { Base } from './base.entity';

@Entity()
export class User extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts?: Promise<Account[]>;
}
