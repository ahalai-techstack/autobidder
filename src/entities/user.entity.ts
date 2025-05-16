import { Base } from 'src/entities/base.entity';

export class User {
  constructor(
    public readonly id: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    // super(id, createdAt, updatedAt);
  }
}
