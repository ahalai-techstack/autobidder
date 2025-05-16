// // src/infrastructure/persistence/typeorm/repositories/user.repository.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { IUserRepository } from '../../../../domain/repositories/user-repository';
// import { User } from '../../../../domain/entities/user.entity';

// @Injectable()
// export class UserTypeOrmRepository implements IUserRepository {
//   constructor(
//     @InjectRepository(User) private readonly repo: Repository<User>,
//   ) {}

//   findById(id: string): Promise<User | null> {
//     return this.repo.findOne({ where: { id } });
//   }

//   findByEmail(email: string): Promise<User | null> {
//     return this.repo.findOne({ where: { email } });
//   }

//   async save(user: User): Promise<void> {
//     await this.repo.save(user);
//   }
// }
