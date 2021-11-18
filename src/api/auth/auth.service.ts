import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserI } from '../../interfaces/User';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDto): Promise<any> {
    const user = await this.validateUser(payload.email, payload.password);
    return this.createToken(user);
  }

  register(user: RegisterDto) {
    return user;
  }

  async validateUser(email: string, password: string): Promise<UserI | null> {
    const user = await this.usersService.findUser(email);
    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async createToken(
    user: UserI,
  ): Promise<{ access_token: string; user: UserI }> {
    return {
      access_token: this.jwtService.sign({ email: user.email, id: user.id }),
      user,
    };
  }
}
