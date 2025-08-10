import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserViewDto } from './dto/user-view.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(): Promise<UserViewDto[]> {
    const users = await this.repo.find();
    return users.map((user) => new UserViewDto(user));
  }

  async findOne(userId: string) {
    const user = await this.repo.findOne({
      where: { id: userId },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const existing = await this.repo.findOne({ where: { email: data.email } });
    if (existing) throw new ConflictException('Email is already in use');

    const created = this.repo.create(data);
    const saved = await this.repo.save(created);
    return saved;
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
