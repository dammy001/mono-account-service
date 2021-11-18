import { Module, Global } from '@nestjs/common';
import { UsersService } from './users.service';

@Global()
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
