import { Base } from './base.entity';

export class User extends Base {
  constructor(
    public id: string,
    public createdAt: Date,
    public updatedAt: Date,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
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
