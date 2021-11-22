import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    const registerUser = await this.usersService.createUser({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });

    return this.createToken(registerUser);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findUser(email);
      const isMatch = await bcrypt.compare(password, user.password);

      if (user && isMatch) {
        return user;
      }
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Oops! Something went wrong on the server',
      );
    }
  }

  async createToken(user: User): Promise<{ token: string; user: User }> {
    return {
      token: this.jwtService.sign({ email: user.email, id: user.id }),
      user,
    };
  }
}
