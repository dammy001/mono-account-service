import { Injectable } from '@nestjs/common';
import { users } from '../../constants';
import { UserI } from '../../interfaces/User';

@Injectable()
export class UsersService {
  private readonly users: UserI[] = users;

  async createUser(user: UserI): Promise<UserI | undefined> {
    this.users.push({ ...user });
    return user;
  }

  async findUser(email: string): Promise<UserI | undefined> {
    return this.users.find((user: UserI) => user.email === email);
  }
}
