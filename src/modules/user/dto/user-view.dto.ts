import { User } from '../user.entity';

export class UserViewDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
  roles: string[];

  constructor(partial: Partial<User>) {
    delete partial.password;
    Object.assign(this, partial);
  }
}
