import { Base } from './base.entity';

export class User extends Base {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    super(id, createdAt, updatedAt);
  }
}
