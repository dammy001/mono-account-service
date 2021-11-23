/* eslint-disable @typescript-eslint/no-var-requires */
import { AccountI, UserI } from 'src/interfaces';
const faker = require('faker');
import { Transaction } from 'src/models/transaction.entity';

export const accounts: AccountI[] = [
  {
    id: 1,
    user_id: 1,
    balance: 400000,
    account_name: 'Guaranty Trust Bank',
    logo: 'https://',
  },
  {
    id: 1,
    user_id: 1,
    balance: 400000,
    account_name: 'Access Bank',
    logo: 'https://',
  },
  {
    id: 1,
    user_id: 2,
    balance: 400000,
    account_name: 'Access Bank',
    logo: 'https://',
  },
  {
    id: 1,
    user_id: 2,
    balance: 400000,
    account_name: 'Access Bank',
    logo: 'https://',
  },
];

export const users: UserI[] = [
  {
    id: 1,
    first_name: 'damilare',
    last_name: 'anjorin',
    email: 'damilare@gmail.com',
    password: 'changeme',
  },
  {
    id: 2,
    first_name: 'maria',
    last_name: 'anjorin',
    email: 'damilareanjorin1@gmail.com',
    password: 'password',
  },
];

export const generateRandomTransaction = (min = 0, max = 20): Transaction[] => {
  const results = [];
  for (let i = 0; i < Math.floor(Math.random() * (max - min + 1)) + min; i++) {
    results.push({
      description: faker.random.words(),
      amount: parseInt(faker.finance.amount(5000, 100000)),
      type: faker.random.arrayElements(['dr', 'cr']),
      transactionDate: faker.date.recent(),
      status: faker.random.arrayElements(['pending', 'success', 'failed']),
    });
  }
  return results;
};
