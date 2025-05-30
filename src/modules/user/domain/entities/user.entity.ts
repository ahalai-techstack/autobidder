import { Base } from '../../../../entities/base.entity';

export class User extends Base {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): User {
    const id = crypto.randomUUID();
    const currentTime = new Date();
    return new User(
      id,
      currentTime,
      currentTime,
      firstName,
      lastName,
      email,
      password,
    );
  }
}
