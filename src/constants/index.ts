import { AccountI, UserI } from 'src/interfaces';

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
