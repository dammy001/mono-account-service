import { Module, Global } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../models/account.entity';

@Global()
@Module({
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
