import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { UserSchema } from '../schemas/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repo: Repository<User>,
  ) {}

  async save(user: User): Promise<void> {
    await this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.repo.findOneBy({ id });
    return result ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.repo.findOneBy({ email });
    return result ?? null;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
