import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.entity';
import * as bcrypt from 'bcrypt';

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

  async register(user: RegisterDto): Promise<any> {
    const findUser = await this.usersService.findUser(user.email);

    if (findUser) {
      throw new HttpException('Email Already Exists', HttpStatus.BAD_REQUEST);
    }

    const registerUser = await this.usersService.createUser({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });

    return this.createToken(registerUser);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUser(email);
    if (!user) {
      this.userNotFound();
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      this.userNotFound();
    }

    return user;
  }

  userNotFound() {
    throw new HttpException(
      'Wrong credentials provided',
      HttpStatus.BAD_REQUEST,
    );
  }

  async createToken(user: User): Promise<{ token: string; user: User }> {
    return {
      token: this.jwtService.sign({ email: user.email, id: user.id }),
      user,
    };
  }
}
