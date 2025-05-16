// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserSchema } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find();
  }
  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }
  create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.repo.save(this.repo.create(data as any));
  }
  update(id: string, data: Partial<User>) {
    return this.repo.update(id, data);
  }
  remove(id: string) {
    return this.repo.delete(id);
  }
}
