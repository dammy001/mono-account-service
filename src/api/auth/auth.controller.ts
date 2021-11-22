import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/index.dto';
import { SkipAuth } from '../../decorators/public-route.decorator';
import { User } from 'src/decorators/user.decorator';
import { User as UserEntity } from 'src/models/user.entity';
import { Account } from 'src/models/account.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }

  @SkipAuth()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return this.authService.register(registerDto);
  }

  @Get('session')
  async getProfile(@User() user: UserEntity): Promise<{
    user: UserEntity;
    accounts: Account[];
  }> {
    return {
      user,
      accounts: await user.accounts,
    };
  }
}
