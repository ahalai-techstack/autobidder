import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User | null> {
    const user = await this.repo.findById(id);
    if (!user) return null;

    const updated = new User(
      user.id,
      user.createdAt,
      new Date(), // updatedAt
      dto.firstName ?? user.firstName,
      dto.lastName ?? user.lastName,
      dto.email ?? user.email,
      dto.password ?? user.password,
    );

    await this.repo.save(updated);
    return updated;
  }
}
