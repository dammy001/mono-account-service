import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/index.dto';
import { Request } from 'express';
import { SkipAuth } from '../../decorators/public-route.decorator';

@Controller('auth')
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
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
