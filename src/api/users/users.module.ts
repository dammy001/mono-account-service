import { Module, Global } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Account } from 'src/models/account.entity';

@Global()
@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Account])],
  exports: [UsersService],
})
export class UsersModule {}
