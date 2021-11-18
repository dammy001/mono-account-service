import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { AuthModule } from './api/auth/auth.module';
import { AccountModule } from './api/account/account.module';
import { UsersModule } from './api/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    AccountModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
