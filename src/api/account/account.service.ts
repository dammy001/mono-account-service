import { Injectable } from '@nestjs/common';
import { AccountI } from 'src/interfaces/Account';
import { accounts } from 'src/constants';

@Injectable()
export class AccountService {
  private readonly accounts: AccountI[] = accounts;

  createAccount() {
    return 'create account';
  }

  async getAccount(id: string | number): Promise<AccountI> {
    return this.accounts.find((account: AccountI) => account.id === id);
  }

  async unlinkAccount(account: string | number) {
    return account;
  }
}
