import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { UserSchema } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserViewDto } from './dto/user-view.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(): Promise<UserViewDto[]> {
    const users = await this.repo.find();
    return users.map((user) => new UserViewDto(user));
  }

  async findOne(id: string): Promise<UserViewDto> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return new UserViewDto(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const existing = await this.repo.findOne({ where: { email: data.email } });
    if (existing) throw new ConflictException('Email is already in use');

    const created = User.create(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
    );
    const saved = await this.repo.save(created);
    return saved;
  }

  async update(id: string, data: UpdateUserDto): Promise<UserViewDto> {
    const user = await this.findOne(id);

    if (data.email && data.email !== user.email) {
      const existing = await this.repo.findOne({
        where: { email: data.email },
      });
      if (existing) throw new ConflictException('Email is already in use');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updated = this.repo.merge(user as User, data);
    const saved = await this.repo.save(updated);
    return new UserViewDto(saved);
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
