import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class RemoveUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.repo.findById(id);
    if (user) {
      await this.repo.delete(id);
    }
  }
}
