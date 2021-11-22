import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User | undefined> {
    try {
      const createUser = this.usersRepository.create(user);
      await this.usersRepository.save(createUser);

      return createUser;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findUser(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }
}
