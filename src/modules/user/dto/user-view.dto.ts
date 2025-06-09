import { User } from 'src/entities/user.entity';

export class UserViewDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;

  constructor(partial: Partial<User>) {
    delete partial.password;
    Object.assign(this, partial);
  }
}
