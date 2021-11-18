import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'mono',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
};
